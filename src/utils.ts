import * as vscode from "vscode";
import { spawn, exec } from "child_process";
import { platform } from "os";
import { join } from "path";
import { existsSync, readdirSync } from "fs";
import { GlobalVars, statusBarObj } from "./extension";
import { currentUserPath } from "./helper";
let pipPackagePath = `${join(__dirname, "../venv/Lib/site-packages")}`;

// get timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
// logging with current timestamp
export const log = (...args: string[]) =>
  console.log(timestamp(), " | ", ...args);
export let recognizer: RecognizerRunner;

export class StatusBarItem {
  private statusBarItem: vscode.StatusBarItem;
  private status: string;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.status = "off";
    this.statusBarItem.tooltip = `Voice Collab - ${this.status}`;
    this.stopListening();
  }

  startListening() {
    this.statusBarItem.text = "👂Listening";
    this.statusBarItem.show();
    this.status = "on";
    GlobalVars.recognizerActive = true;
  }

  stopListening() {
    this.statusBarItem.text = "🔇Stopped";
    this.statusBarItem.show();
    this.status = "off";
    GlobalVars.recognizerActive = false;
  }

  getSttText() {
    return this.status;
  }
}

export class RecognizerRunner {
  // @ts-ignore
  private sysType;
  // @ts-ignore
  private execFile;
  // @ts-ignore
  private child;
  private setupSuccess = true;
  constructor() {
    this.sysType = platform();
    this.execFile = spawn;
  }

  runRecognizer(): boolean {
    // not using the below since we have variable in .env file and will load that in Python scripts
    // log(
    //   // @ts-ignore
    //   `Extension Dir - ${__dirname}\nWorkspace Dir ${vscode.workspace.workspaceFolders[0].uri.fsPath}`
    // );
    // exec(`& ${join(__dirname, "../venv/Scripts/Activate.ps1")}`);

    // run the recognizer for Windows
    if (this.sysType.startsWith("win")) {
      this.child = this.execFile(
        join(__dirname, "../venv/Scripts/python.exe"),
        [join(__dirname, "../python_scripts/app.py")]
      );
    }

    // get the standard output stream and log it
    this.child.stdout.on("data", (data: Buffer) => {
      log(`Data from Recognizer - ${data.toString()}`);
    });

    // get the standard error stream and log it
    this.child.stderr.on("data", (data: any) => {
      console.log(`Recognizer - ${data.toString()}`);

      // log if we get an exception from the voice recognition server
      if (data.toString().startsWith("Traceback ")) {
        this.showError(data.toString());
      }
    });

    GlobalVars.recognizerActive = true;

    return this.setupSuccess;
  }

  showError(error: any) {
    /** Error callback. */

    // vscode.window.showInformationMessage(`Something went wrong - ${error}`);
    log(`Error while trying to launch the recognizer python - ${error}`);
    // this.setupSuccess = false;
  }

  killRecognizer() {
    /** stop the recognizer - python server */

    // sending the terminate signal to make a clean exit
    this.child.kill("SIGTERM");
    statusBarObj.stopListening();
    GlobalVars.recognizerActive = false;
  }
}

export function installRequirements() {
  /** This installs the Python packages from the file. */
  let methodStatus = true;

  const pipPackageCount = readdirSync(pipPackagePath).length;
  log(`There are a total of ${pipPackageCount} PIP packages`);

  // check if the PIP packages are installed 
  if (pipPackageCount < 10) {
    // install the packages needed for voice recognition server
    log("Started installing the requirements");
    exec(
      `& "${join(__dirname, "../venv/Scripts/pip")}" install -r "${join(
        __dirname,
        "../requirements.txt"
      )}"`
    ).on("error", (error: any) => {
      log("Error while installing requirements");

      vscode.window.showErrorMessage(
        `Can't install requirements file - ${error}`
      );
    });
    methodStatus = false;
  } else {
    log("PIP packages are already installed!");

    // vscode.window.showInformationMessage("PIP packages are already installed!");
  }
  return methodStatus;
}

export function setupVirtualEnvironment() {
  /** This creates a virtual environment for the voice recognition server. */

  let methodStatus: boolean = true;

  // check if a virtual environment exists
  if (!existsSync(join(__dirname, "../venv/Scripts/python.exe"))) {
    exec(`python -m venv "${join(__dirname, "../venv")}"`).on(
      "error",
      (error: any) => {
        log("Error while creating virtual environment");
        vscode.window.showErrorMessage(
          `Can't create virtual environment - ${error}`
        );

        methodStatus = false;
      }
    );

  } else {
    log("Virtual environment already exists");
    // vscode.window.showInformationMessage("Virtual environment already exists");
  }
  return methodStatus;
}

export function installUserRequirements() {
  /** This installs the Python packages from the file. */

  log("Started installing the requirements");
  
  const pipPackageCount = readdirSync(pipPackagePath).length;
  let requirementFilePath = join(currentUserPath, "requirements.txt");

  if (!existsSync(requirementFilePath) && pipPackageCount < 10) {
    // install the packages needed for voice recognition server
    exec(
      `& "${join(
        currentUserPath,
        "venv/Scripts/pip"
      )}" install -r "${requirementFilePath}"`
    ).on("error", (error: any) => {
      log("Error while installing requirements");

      vscode.window.showErrorMessage(
        `Can't install requirements file - ${error}`
      );
    });
  } else {
    log("No requirement.txt file found");

    vscode.window.showErrorMessage(
      "Need a requirement.txt file in the root directory"
    );
  }

}

export function setupUserVirtualEnvironment() {
  /** This creates a virtual environment in the root dir. */

  let runSuccess: boolean = true;
  if (currentUserPath === "") {
    

    let venvPath = `"${join(currentUserPath, "venv")}"`;

    // check if a virtual environment exists
    if (!existsSync(join(currentUserPath, "venv/Scripts/python.exe"))) {
      exec(`python -m venv ${venvPath}`).on("error", (error: any) => {
        log("Error while creating virtual environment");

        vscode.window.showErrorMessage(
          `Can't create virtual environment - ${error}`
        );

        runSuccess = false;
      });

      if (runSuccess) {
        log("Successfully created the virtual environment!");
        vscode.window.showInformationMessage(
          "Successfully created the virtual environment!"
        );
      }
    } else {
      log("Virtual environment already exists");

      vscode.window.showInformationMessage("Virtual environment already exists");
    }
  }
}

export function startRecognizer() {
  /** This starts the recognizer and updates the status bar . */

  recognizer = new RecognizerRunner();

  let runStatus = recognizer.runRecognizer();
  statusBarObj.startListening();

  return runStatus;
}

export function stopRecognizer() {
  /** This stops the voice recognition server and updates the status bar. */

  recognizer.killRecognizer();
  log("Killed voice recognizer!");
  statusBarObj.stopListening();
}
