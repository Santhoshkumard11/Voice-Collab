import * as vscode from "vscode";
import { spawn, execFile, exec, SpawnOptions } from "child_process";
import { platform } from "os";
import { join } from "path";
import { existsSync } from "fs";
import { statusBarObj } from "./extension";

// logging with timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
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
  }

  stopListening() {
    this.statusBarItem.text = "🔇Stopped";
    this.statusBarItem.show();
    this.status = "off";
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
  private side = false;
  private setupSuccess = true;
  constructor() {
    this.sysType = platform();
    this.execFile = spawn;
  }

  runRecognizer(): boolean {
    if (this.sysType.startsWith("win")) {
      this.child = this.execFile(
        join(__dirname, "../venv/Scripts/python.exe"),
        [join(__dirname, "../python_scripts/app.py")]
      );
    }
    this.child.stdout.on("data", (data: Buffer) => {
      log(`Data from Recognizer - ${data.toString()}`);
    });

    this.child.stderr.on("data", (data: any) => {
      console.log(`Recognizer - ${data.toString()}`);
      if (data.toString().startsWith("Traceback ")) {
        this.showError(data.toString());
      }
    });

    return this.setupSuccess;
  }

  showError(error: any) {
    // vscode.window.showInformationMessage(`Something went wrong - ${error}`);
    log(`Error while trying to launch the recognizer python - ${error}`);
    // this.setupSuccess = false;
  }

  killRecognizer() {
    // stop the recognizer - python server
    this.child.disconnect();
  }
}

export function installRequirements() {
  log("Started installing the requirements");
  // install the packages needed for recognizer
  exec(
    `${join(__dirname, "../venv/Scripts/pip")} install -r ${join(
      __dirname,
      "../requirements.txt"
    )}`
  ).on("error", (error: any) => {
    log("Error while installing requirements");
    vscode.window.showErrorMessage(
      `Can't install requirements file - ${error}`
    );
  });
}

export function setupVirtualEnvironment() {
  let runSuccess: boolean = true;

  if (!existsSync(join(__dirname, "../venv/Scripts/python.exe"))) {
    exec("python -m venv venv").on("error", (error: any) => {
      log("Error while creating virtual environment");
      vscode.window.showErrorMessage(
        `Can't create virtual environment - ${error}`
      );
      runSuccess = false;
    });

    if (runSuccess) {
      vscode.window.showInformationMessage(
        "Successfully created the virtual environment!"
      );

      installRequirements();
      log("Successfully installed required packages for recognizer");
    }
  } else {
    log("Virtual environment already exists");
    vscode.window.showInformationMessage("Virtual environment already exists");
  }
}

export function startRecognizer() {
  recognizer = new RecognizerRunner();

  let runStatus = recognizer.runRecognizer();
  statusBarObj.startListening();
  
  return runStatus;
}
