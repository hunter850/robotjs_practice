"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// lib
const registGlobalHandler_1 = require("./handlers/registGlobalHandler");
const registWindowSizeStatusHandler_1 = require("./handlers/registWindowSizeStatusHandler");
const registRobotHandler_1 = require("./handlers/registRobotHandler");
const path = require("path");
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        show: false, // disable initial window from showing
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    if (electron_1.app.isPackaged) {
        win.loadFile("./build/index.html");
    }
    else {
        win.loadURL("http://localhost:3000");
    }
    /*--------------------------- check window size --------------------------*/
    (0, registGlobalHandler_1.default)();
    (0, registWindowSizeStatusHandler_1.default)(win);
    (0, registRobotHandler_1.default)();
    // show window without setting focus
    win.showInactive();
    // Open the DevTools.
    // win.webContents.openDevTools();
};
electron_1.app.whenReady().then(() => {
    if (require("electron-squirrel-startup"))
        electron_1.app.quit();
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
