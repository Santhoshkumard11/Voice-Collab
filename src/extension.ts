import * as vscode from "vscode";
import { activateVoice, deactivateVoice } from "./audio_capture";

export function activate(context: vscode.ExtensionContext) {
  console.log("Voice Collab is now active!");

  let websocketConnection;

  let disposable = vscode.commands.registerCommand("voice.notification", () => {
    // send a notification to the user - like a test notification

    vscode.window.showInformationMessage("Enjoy with Voice Collab");
  });

  let activateVoiceDisposable = vscode.commands.registerCommand(
    "voice.activate_voice",
    () => {
      // this opens up the websocket connection for voice recognition

      activateVoice();
      vscode.window.showInformationMessage("Voice recognition activated!");
    }
  );

  let deactivateVoiceDisposable = vscode.commands.registerCommand(
    "voice.deactivate",
    () => {
      // this closes the websocket connection

      deactivateVoice();
      vscode.window.showInformationMessage("Voice recognition deactivate!");
    }
  );

  context.subscriptions.push(
    disposable,
    activateVoiceDisposable,
    deactivateVoiceDisposable
  );
}

export function deactivate() {
  deactivateVoice();
  vscode.window.showInformationMessage("Thanks for using the extension.");
}
