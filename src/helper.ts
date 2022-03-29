import { exec } from "child_process";
import { log } from "./utils";
import * as vscode from "vscode";

let commands = ["git push"];

export function mapCommand(recognizedText: string) {
  if (recognizedText.trim() === "git push") {
    log(`Extension executing command - ${recognizedText}`);

    // @ts-ignore
    // this gives us the users working directory
    let currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    executeCommand(`git --git-dir= ${currentPath} push`);
  }
}

function executeCommand(command: string) {
  exec(command).on("error", (error: any) => {
    log(`Error while executing the script ${error}`);
  });
}
