import { window } from "vscode";
import * as WebSocket from "ws";
import { log } from "./utils";
export let ws: WebSocket;

export function activateVoice() {
  log("Activate voice mode");

  ws = new WebSocket("ws://localhost:8001");

  ws.onopen = () => {
    ws.send("Connected with extension");
    console.log("websocket connection is open!");
  };

  ws.onmessage = (message) => {
    const received = JSON.parse(message.data.toString());
    const transcript = received.message;
    if (transcript) {
      log("server - " + transcript);
    }
  };
}

export function deactivateVoice() {
  log("Deactivate voice mode");
  ws.send("Extension deactivated");
  ws.close();
}
