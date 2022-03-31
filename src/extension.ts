import * as vscode from "vscode";
import { activateVoice, deactivateVoice } from "./audio_capture";
import { currentUserPath } from "./helper";
import {
  log,
  StatusBarItem,
  setupVirtualEnvironment,
  startRecognizer,
  stopRecognizer,
  installRequirements,
} from "./utils";
export let statusBarObj: StatusBarItem;
export class GlobalVars {
  public static recognizerActive: boolean = false;
}

export function activate(context: vscode.ExtensionContext) {
  /** This is executed when the user activated or installs the extension */

  log("Voice Collab extension is now active!");
  log(`Extension path - ${__dirname}`);
  log(`User workspace path - ${currentUserPath}`);

  // initialize the status bar item
  statusBarObj = new StatusBarItem();

  // setup things needed for the voice recognition server to run
  let setupSuccess: boolean = setupVirtualEnvironment();
  let installSuccess: boolean = installRequirements();

  if (setupSuccess && installSuccess)
  {
    vscode.window.showInformationMessage("✅ Voice recognition is all set to run!");
    log("Voice recognition is all set to run!");
  }
  else if (!setupSuccess){
    vscode.window.showInformationMessage("Unable to setup virtual environment in your system! Check manually and install it!");
    log(
      "Unable to setup virtual environment in your system! Check manually and install it!"
    );
  }
  else if (!installSuccess){
    vscode.window.showInformationMessage(
      "Unable to install PIP packages in your system! Check manually and install it!"
    );
    log(
      "Unable to install PIP packages in your system! Check manually and install it!"
    );
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("voice.notification", () => {
      // send a notification to the user - a test notification
      log("Just a notification");

      vscode.window.showInformationMessage("Enjoy with Voice Collab!");
    })
  );

  // create a WebSocket connection to the voice recognition server
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.activate_voice", () => {
      // check if the server is running
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
    })
  );

  // this creates the virtual environment
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.setup_environment", () => {
      if (!GlobalVars.recognizerActive) {
        setupVirtualEnvironment();
      } else {
        vscode.window.showInformationMessage(
          "Voice recognizer is already running!"
        );
      }
    })
  );

  // this starts the voice recognition server
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.start_recognizer_server", () => {
      let runSuccess = startRecognizer();

      if (runSuccess) {
        vscode.window.showInformationMessage(
          "Successfully started recognizer server!"
        );
        GlobalVars.recognizerActive = true;
      } else {
        vscode.window.showErrorMessage(
          "Failed to start the recognizer server!"
        );
        GlobalVars.recognizerActive = false;
      }
    })
  );

  // this closes the websocket connection
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.deactivate_voice", () => {
      // check if the server is running
      if (GlobalVars.recognizerActive) {
        deactivateVoice();
      } else {
        vscode.window.showErrorMessage(
          "Voice recognition server is not running!"
        );
        log("Voice recognition server is not running!");
      }
      vscode.window.showInformationMessage("Voice recognition deactivate!");
    })
  );

  // Soft terminate the voice recognition server
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.stop_recognizer", () => {
      stopRecognizer();
      vscode.window.showInformationMessage("Voice recognizer stopped!");
    })
  );

  // install Python packages from requirement.txt file
  context.subscriptions.push(
    vscode.commands.registerCommand("voice.install_requirements", () => {
      if (!GlobalVars.recognizerActive) {
        installRequirements();
      } else {
        vscode.window.showInformationMessage(
          "Voice recognizer is already running!"
        );
      }
    })
  );
}

export function deactivate() {
  /** This executed when the extension is disabled by the user*/

  deactivateVoice();
  vscode.window.showInformationMessage("Voice Collab is deactivated!");
}
