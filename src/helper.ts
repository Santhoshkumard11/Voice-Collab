import { exec } from "child_process";
import { log } from "./utils";
import * as vscode from "vscode";

let commands = ["git push"];
let codexCommands = ["hey codex", "codex", "hey codecs", "codecs"];

// execute the command if it matches one of the connections below
export function mapCommand(recognizedText: string) {
  if (recognizedText.trim() === "git push") {
    log(`Extension executing command - ${recognizedText}`);

    // @ts-ignore
    // this gives us the users working directory
    let currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    executeCommand(`git --git-dir= ${currentPath} push`);
  }

  if (recognizedText.startsWith("codex")) {
    recognizedText = recognizedText
      .replace("codex", "")
      .trim()
      .replace("+", "");
    log(`Extension executing command - ${recognizedText}`);
    insertTextToEditor(recognizedText);
  }
}
function insertTextToEditor(text: string) {
  const editor = vscode.window.activeTextEditor;
  // check if we have an active editor
  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, text);
    });
  }
}

function executeCommand(command: string) {
  exec(command).on("error", (error: any) => {
    log(`Error while executing the script ${error}`);
  });
}

function checkIfCommandExists(recognizedText: string) {
  for (let command of codexCommands) {
    if (recognizedText.includes(command)) {
      return true;
    }
  }
  return false;
}
