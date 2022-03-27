import { window } from "vscode";
import * as WebSocket from "ws";
import { log } from "./utils";
export let ws: WebSocket;

export function activateVoice() {
  log("Voice mode activated!");

  if (!ws) {
    ws = new WebSocket("ws://localhost:8001");
  } else {
    if (ws.readyState !== 1) {
      ws.close();
      ws = new WebSocket("ws://localhost:8001");
      log("Creating a new websocket connection");
    } else {
      log("There is an existing websocket connection");
    }
  }

  ws.onopen = () => {
    ws.send("Connected with extension");
    log("websocket connection is open!");
  };

  ws.onmessage = (message) => {
    const received = JSON.parse(message.data.toString());
    const transcript = received.message;
    if (transcript) {
      log("server - " + transcript);
    }
  };

  ws.onerror = (event) => {
    log(`An error occurred in the connection - ${event.message}`);
  };

  ws.onclose = (event) => {
    log("closing connection in extension");
    if (event.wasClean) {
      log(`Clean - Closing connection with the server \ncode - ${event.code} - \nreason - ${event.reason}`);
    } else {
      log("unClean - Closing websocket connection with the server");
    }
  };
}

export function deactivateVoice() {
  log("Deactivate voice mode");
  ws.send("Extension deactivated");
  ws.close();
}
