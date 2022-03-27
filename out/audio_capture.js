"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateVoice = exports.activateVoice = exports.ws = void 0;
const WebSocket = require("ws");
const utils_1 = require("./utils");
const extension_1 = require("./extension");
function activateVoice() {
    (0, utils_1.log)("Voice mode activated!");
    // start the python script
    if (!exports.ws) {
        exports.ws = new WebSocket("ws://localhost:8001");
    }
    else {
        if (exports.ws.readyState !== 1) {
            exports.ws.close();
            exports.ws = new WebSocket("ws://localhost:8001");
            (0, utils_1.log)("Creating a new websocket connection");
        }
        else {
            (0, utils_1.log)("There is an existing websocket connection");
        }
    }
    exports.ws.onopen = () => {
        exports.ws.send("Connected with extension");
        (0, utils_1.log)("websocket connection is open!");
        // set the status to listening
        extension_1.statusBarObj.startListening();
    };
    exports.ws.onmessage = (message) => {
        const received = JSON.parse(message.data.toString());
        const transcript = received.message;
        if (transcript) {
            (0, utils_1.log)("server - " + transcript);
        }
    };
    exports.ws.onerror = (event) => {
        (0, utils_1.log)(`An error occurred in the connection - ${event.message}`);
    };
    exports.ws.onclose = (event) => {
        (0, utils_1.log)("closing connection in extension");
        if (event.wasClean) {
            (0, utils_1.log)(`Clean - Closing connection with the server \ncode - ${event.code} \nreason - ${event.reason}`);
        }
        else {
            (0, utils_1.log)("Error - Closing websocket connection with the server");
        }
    };
}
exports.activateVoice = activateVoice;
function deactivateVoice() {
    (0, utils_1.log)("Deactivate voice mode");
    exports.ws.send("Extension deactivated");
    exports.ws.close();
}
exports.deactivateVoice = deactivateVoice;
//# sourceMappingURL=audio_capture.js.map