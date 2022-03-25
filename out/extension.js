"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const audio_capture_1 = require("./audio_capture");
const utils_1 = require("./utils");
function activate(context) {
    (0, utils_1.log)("Voice Collab is now active!");
    vscode.commands.registerCommand("voice.notification", () => {
        // send a notification to the user - like a test notification
        vscode.window.showInformationMessage("Enjoy with Voice Collab");
    });
    vscode.commands.registerCommand("voice.activate_voice", () => {
        // this opens up the websocket connection for voice recognition
        (0, audio_capture_1.activateVoice)();
        vscode.window.showInformationMessage("Voice recognition activated!");
    });
    vscode.commands.registerCommand("voice.deactivate_voice", () => {
        // this closes the websocket connection
        (0, audio_capture_1.deactivateVoice)();
        vscode.window.showInformationMessage("Voice recognition deactivate!");
    });
}
exports.activate = activate;
function deactivate() {
    (0, audio_capture_1.deactivateVoice)();
    vscode.window.showInformationMessage("Thanks for using the extension.");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map