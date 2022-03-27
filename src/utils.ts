import * as vscode from "vscode";
import { spawn, execFile, exec } from "child_process";
import { platform } from "os";
import { join } from "path";

// logging with timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
export const log = (...args: string[]) =>
  console.log(timestamp(), " | ", ...args);

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
        [join(__dirname, "../python/app.py")]
      ).on("error", (error: any) => this.showError(error));
    }
    this.child.stdout.on("data", (data: Buffer) => {
      log(`Data from server - ${data.toString()}`);
    });

    this.child.stderr.on("data", (data: any) =>
      this.showError(data.toString())
    );

    return this.setupSuccess;
  }

  showError(error: any) {
    vscode.window.showInformationMessage(`Something went wrong - ${error}`);
    log(`Error while trying to launch the recognizer python - ${error}`);
    this.setupSuccess = false;
  }

  killRecognizer() {
    // stop the recognizer - python server
    this.child.stdin.write("kill");
    this.child.stdin.end();
  }
}

export function installRequirements() {
  exec("pip install -r ../requirements.txt").on("error", (error: any) => {
    log("Error while installing requirements");
    vscode.window.showErrorMessage(
      `Can't install requirements file - ${error}`
    );
  });
}

export function setupVirtualEnvironment() {
  let runSuccess: boolean = true;
  exec("py -m venv venv").on("error", (error: any) => {
    log("Error while creating virtual environment");
    vscode.window.showErrorMessage(
      `Can't create virtual environment - ${error}`
    );
    runSuccess = false;
  });
  return runSuccess;
}
