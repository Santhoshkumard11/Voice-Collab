import * as vscode from "vscode";
import { activateVoice, deactivateVoice } from "./audio_capture";
import {
  log,
  StatusBarItem,
  setupVirtualEnvironment,
  startRecognizer,
  stopRecognizer,
} from "./utils";
export let statusBarObj: StatusBarItem;
export class GlobalVars {
  public static recognizerActive: boolean = false;
}

export function activate(context: vscode.ExtensionContext) {
  log("Voice Collab extension is now active!");
  statusBarObj = new StatusBarItem();

  vscode.commands.registerCommand("voice.notification", () => {
    // send a notification to the user - like a test notification
    log("Just a notification");

    vscode.window.showInformationMessage("Enjoy with Voice Collab!");
  });

  vscode.commands.registerCommand("voice.activate_voice", () => {
    // this opens up the websocket connection for voice recognition
    // check if the server is running before running this
    if (GlobalVars.recognizerActive) {
      activateVoice();
      vscode.window.showInformationMessage("Voice recognition activated!");
    } else {
      vscode.window.showErrorMessage(
        "Start the voice recognizer server before activating voice command mode"
      );
      log(
        "Start the voice recognizer server before activating voice command mode"
      );
    }
  });

  vscode.commands.registerCommand("voice.setup_environment", () => {
    // this opens up the websocket connection for voice recognition
    if (!GlobalVars.recognizerActive) {
      setupVirtualEnvironment();
    } else {
      vscode.window.showInformationMessage(
        "Voice recognizer is already running!"
      );
    }
  });

  vscode.commands.registerCommand("voice.start_recognizer_server", () => {
    // this opens up the websocket connection for voice recognition

    let runSuccess = startRecognizer();

    if (runSuccess) {
      vscode.window.showInformationMessage(
        "Successfully started recognizer server!"
      );
      GlobalVars.recognizerActive = true;
    } else {
      vscode.window.showErrorMessage("Failed to start the recognizer server!");
      GlobalVars.recognizerActive = false;
    }
  });

  vscode.commands.registerCommand("voice.deactivate_voice", () => {
    // this closes the websocket connection

    deactivateVoice();
    vscode.window.showInformationMessage("Voice recognition deactivate!");
  });
  vscode.commands.registerCommand("voice.stop_recognizer", () => {
    stopRecognizer();
    vscode.window.showInformationMessage("Voice recognizer stopped!");
  });
}

export function deactivate() {
  deactivateVoice();
  vscode.window.showInformationMessage("Thanks for using the extension.");
}
