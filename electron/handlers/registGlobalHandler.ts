import { app, ipcMain } from "electron";
import * as os from "os";

function registGlobalHandler() {
    ipcMain.handle("is-mac", () => {
        return os.platform() === "darwin";
    });
    ipcMain.handle("is-windows", () => {
        return os.platform() === "win32";
    });
    ipcMain.handle("is-linux", () => {
        return os.platform() === "linux";
    });
    ipcMain.handle("get-version", () => {
        return app.getVersion();
    });
}

export default registGlobalHandler;
