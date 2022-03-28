"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRecognizer = exports.setupVirtualEnvironment = exports.installRequirements = exports.RecognizerRunner = exports.StatusBarItem = exports.recognizer = exports.log = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const extension_1 = require("./extension");
// logging with timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
const log = (...args) => console.log(timestamp(), " | ", ...args);
exports.log = log;
class StatusBarItem {
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
        this.status = "off";
        this.statusBarItem.tooltip = `Voice Collab - ${this.status}`;
        this.stopListening();
    }
    startListening() {
        this.statusBarItem.text = "👂Listening";
        this.statusBarItem.show();
        this.status = "on";
    }
    stopListening() {
        this.statusBarItem.text = "🔇Stopped";
        this.statusBarItem.show();
        this.status = "off";
    }
    getSttText() {
        return this.status;
    }
}
exports.StatusBarItem = StatusBarItem;
class RecognizerRunner {
    constructor() {
        this.side = false;
        this.setupSuccess = true;
        this.sysType = (0, os_1.platform)();
        this.execFile = child_process_1.spawn;
    }
    runRecognizer() {
        if (this.sysType.startsWith("win")) {
            this.child = this.execFile((0, path_1.join)(__dirname, "../venv/Scripts/python.exe"), [(0, path_1.join)(__dirname, "../python/app.py")]);
        }
        this.child.stdout.on("data", (data) => {
            (0, exports.log)(`Data from Recognizer - ${data.toString()}`);
        });
        this.child.stderr.on("data", (data) => {
            console.log(`Recognizer - ${data.toString()}`);
        });
        return this.setupSuccess;
    }
    showError(error) {
        // vscode.window.showInformationMessage(`Something went wrong - ${error}`);
        (0, exports.log)(`Error while trying to launch the recognizer python - ${error}`);
        // this.setupSuccess = false;
    }
    killRecognizer() {
        // stop the recognizer - python server
        this.child.disconnect();
    }
}
exports.RecognizerRunner = RecognizerRunner;
function installRequirements() {
    (0, exports.log)("Started installing the requirements");
    // install the packages needed for recognizer
    (0, child_process_1.exec)(`${(0, path_1.join)(__dirname, "../venv/Scripts/pip")} install -r ${(0, path_1.join)(__dirname, "../requirements.txt")}`).on("error", (error) => {
        (0, exports.log)("Error while installing requirements");
        vscode.window.showErrorMessage(`Can't install requirements file - ${error}`);
    });
}
exports.installRequirements = installRequirements;
function setupVirtualEnvironment() {
    let runSuccess = true;
    if (!(0, fs_1.existsSync)((0, path_1.join)(__dirname, "../venv/Scripts/python.exe"))) {
        (0, child_process_1.exec)("python -m venv venv").on("error", (error) => {
            (0, exports.log)("Error while creating virtual environment");
            vscode.window.showErrorMessage(`Can't create virtual environment - ${error}`);
            runSuccess = false;
        });
        if (runSuccess) {
            vscode.window.showInformationMessage("Successfully created the virtual environment!");
            installRequirements();
            (0, exports.log)("Successfully installed required packages for recognizer");
        }
    }
    else {
        (0, exports.log)("Virtual environment already exists");
        vscode.window.showInformationMessage("Virtual environment already exists");
    }
}
exports.setupVirtualEnvironment = setupVirtualEnvironment;
function startRecognizer() {
    exports.recognizer = new RecognizerRunner();
    let runStatus = exports.recognizer.runRecognizer();
    extension_1.statusBarObj.startListening();
    return runStatus;
}
exports.startRecognizer = startRecognizer;
//# sourceMappingURL=utils.js.map