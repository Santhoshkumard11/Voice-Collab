import * as vscode from "vscode";
import { activateVoice, deactivateVoice } from "./audio_capture";
import { log } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  log("Voice Collab is now active!");

  vscode.commands.registerCommand("voice.notification", () => {
    // send a notification to the user - like a test notification

    vscode.window.showInformationMessage("Enjoy with Voice Collab");
  });

  vscode.commands.registerCommand("voice.activate_voice", () => {
    // this opens up the websocket connection for voice recognition

    activateVoice();
    vscode.window.showInformationMessage("Voice recognition activated!");
  });

  vscode.commands.registerCommand("voice.deactivate_voice", () => {
    // this closes the websocket connection

    deactivateVoice();
    vscode.window.showInformationMessage("Voice recognition deactivate!");
  });
}

export function deactivate() {
  deactivateVoice();
  vscode.window.showInformationMessage("Thanks for using the extension.");
}
