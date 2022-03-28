"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.GlobalVars = exports.statusBarObj = void 0;
const vscode = require("vscode");
const audio_capture_1 = require("./audio_capture");
const utils_1 = require("./utils");
class GlobalVars {
}
exports.GlobalVars = GlobalVars;
GlobalVars.recognizerActive = false;
function activate(context) {
    (0, utils_1.log)("Voice Collab extension is now active!");
    exports.statusBarObj = new utils_1.StatusBarItem();
    // pip install things here
    vscode.commands.registerCommand("voice.notification", () => {
        // send a notification to the user - like a test notification
        (0, utils_1.log)("Just a notification");
        vscode.window.showInformationMessage("Enjoy with Voice Collab!");
    });
    vscode.commands.registerCommand("voice.activate_voice", () => {
        // this opens up the websocket connection for voice recognition
        // check if the server is running before running this
        if (GlobalVars.recognizerActive) {
            (0, audio_capture_1.activateVoice)();
            vscode.window.showInformationMessage("Voice recognition activated!");
        }
        else {
            vscode.window.showErrorMessage("Start the voice recognizer server before activating voice command mode");
            (0, utils_1.log)("Start the voice recognizer server before activating voice command mode");
        }
    });
    vscode.commands.registerCommand("voice.setup_environment", () => {
        // this opens up the websocket connection for voice recognition
        if (!GlobalVars.recognizerActive) {
            (0, utils_1.setupVirtualEnvironment)();
        }
        else {
            vscode.window.showInformationMessage("Voice recognizer is already running!");
        }
    });
    vscode.commands.registerCommand("voice.start_recognizer_server", () => {
        // this opens up the websocket connection for voice recognition
        let runSuccess = (0, utils_1.startRecognizer)();
        if (runSuccess) {
            vscode.window.showInformationMessage("Successfully started recognizer server!");
            GlobalVars.recognizerActive = true;
        }
        else {
            vscode.window.showErrorMessage("Failed to start the recognizer server!");
            GlobalVars.recognizerActive = false;
        }
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