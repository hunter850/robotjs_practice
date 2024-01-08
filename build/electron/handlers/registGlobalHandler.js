"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const os = require("os");
function registGlobalHandler() {
    electron_1.ipcMain.handle("is-mac", () => {
        return os.platform() === "darwin";
    });
    electron_1.ipcMain.handle("is-windows", () => {
        return os.platform() === "win32";
    });
    electron_1.ipcMain.handle("is-linux", () => {
        return os.platform() === "linux";
    });
    electron_1.ipcMain.handle("get-version", () => {
        return electron_1.app.getVersion();
    });
}
exports.default = registGlobalHandler;
