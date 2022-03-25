"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
// logging with timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
const log = (...args) => console.log(timestamp(), " | ", ...args);
exports.log = log;
//# sourceMappingURL=utils.js.map