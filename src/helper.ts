import { exec } from "child_process";
import { log } from "./utils";
import * as vscode from "vscode";

let commands = ["git push"];

export function executeCommand(recognizedText: string) {
  if (recognizedText.trim() === "git push") {
    log(`Extension executing command - ${recognizedText}`);
    let currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    exec(`git --git-dir= ${currentPath} push`).on("error", (error: any) => {
      log(`Error while executing the script ${error}`);
    });
  }
}
