"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateVoice = exports.activateVoice = exports.ws = void 0;
const WebSocket = require("ws");
const utils_1 = require("./utils");
function activateVoice() {
    (0, utils_1.log)("Activate voice mode");
    exports.ws = new WebSocket("ws://localhost:8001");
    exports.ws.onopen = () => {
        exports.ws.send("Connected with extension");
        console.log("websocket connection is open!");
    };
    exports.ws.onmessage = (message) => {
        const received = JSON.parse(message.data.toString());
        const transcript = received.message;
        if (transcript) {
            (0, utils_1.log)("server - " + transcript);
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