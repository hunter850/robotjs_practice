import { ipcMain, globalShortcut } from "electron";
import * as robot from "robotjs";

let keepDoing: boolean = true;
let stopRequest: boolean = false;
const positionList: { x: number; y: number }[] = [];

function delay(time: number = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

function registRobotHandler() {
    globalShortcut.register("CommandOrControl+Esc", () => {
        console.log("Cancel Move Mouse");
        keepDoing = false;
        stopRequest = true;
    });
    globalShortcut.register("CommandOrControl+R", () => {
        const position = robot.getMousePos();
        positionList.push(position);
    });
    globalShortcut.register("CommandOrControl+E", () => {
        positionList.length = 0;
    });
    globalShortcut.register("CommandOrControl+K", async () => {
        stopRequest = false;
        let count: number = 0;
        while (keepDoing) {
            for (let i = 0; i < positionList.length; i++) {
                if (stopRequest) {
                    break;
                }
                robot.moveMouseSmooth(positionList[i].x, positionList[i].y);
                await delay(1000);
            }
            if (count >= 5) {
                keepDoing = false;
            } else {
                count++;
            }
        }
        keepDoing = true;
    });
    ipcMain.handle("move-mouse", async () => {
        const { width, height } = robot.getScreenSize();
        let count: number = 0;
        while (keepDoing) {
            robot.moveMouseSmooth(50 + width / 2, 50 + height / 2);
            await delay(1000);
            robot.moveMouseSmooth(-50 + width / 2, -50 + height / 2);
            await delay(1000);
            if (count >= 5) {
                keepDoing = false;
            } else {
                count++;
            }
        }
        keepDoing = true;
    });
}

export default registRobotHandler;
