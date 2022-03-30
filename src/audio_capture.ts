import * as WebSocket from "ws";
import { log } from "./utils";
export let ws: WebSocket;
import { statusBarObj, GlobalVars } from "./extension";
import { recognizer } from "./utils";
import * as vscode from "vscode";
import { mapCommand } from "./helper";

export function activateVoice() {
  /** This initiates a WebSocket connection with the Python voice recognition server */

  log("Voice mode activated!");

  if (!ws) {
    ws = new WebSocket("ws://localhost:8001");
  } else {
    // if the connection is other than connected
    if (ws.readyState !== 1) {
      ws.close();
      ws = new WebSocket("ws://localhost:8001");
      log("Creating a new WebSocket connection");
    } else {
      log("There is an existing WebSocket connection");
    }
  }

  // called once the WebSocket connection is open
  ws.onopen = () => {
    ws.send("Connected with extension");
    log("WebSocket connection is open!");

    // set the status to listening
    statusBarObj.startListening();
  };

  // called when we have a new message from the voice recognition server
  ws.onmessage = (message) => {
    const received = JSON.parse(message.data.toString());
    const transcript = received.message;
    if (transcript) {
      log("server - " + transcript);

      // check if the received text is a command to be executed
      mapCommand(transcript);
    }
  };

  // called when we have an error in our WebSocket connection
  ws.onerror = (event) => {
    log(`An error occurred in the connection - ${event.message}`);
    statusBarObj.stopListening();
    recognizer.killRecognizer();
  };

  // called when a WebSocket connection is closed
  ws.onclose = (event) => {
    log("closing connection in extension");
    if (event.wasClean) {
      log(
        `Clean - Closing connection with the server \ncode - ${event.code} \nreason - ${event.reason}`
      );
    } else {
      log("Error - Closing WebSocket connection with the server");
    }

    // set status bar icon and stop the recognizer
    statusBarObj.stopListening();
    recognizer.killRecognizer();

    //set status of the recognizer
    GlobalVars.recognizerActive = false;
    vscode.window.showInformationMessage("Voice Recognition server stopped!");
  };
}

export function deactivateVoice() {
  /** This closes the WebSocket connection */
  
  log("Deactivate voice mode");
  ws.send("Extension deactivated");
  ws.close();

  recognizer.killRecognizer();
  GlobalVars.recognizerActive = false;
}
