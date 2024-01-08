"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const robot = require("robotjs");
let keepDoing = true;
let stopRequest = false;
const positionList = [];
function delay(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}
function registRobotHandler() {
    electron_1.globalShortcut.register("CommandOrControl+Esc", () => {
        console.log("Cancel Move Mouse");
        keepDoing = false;
        stopRequest = true;
    });
    electron_1.globalShortcut.register("CommandOrControl+R", () => {
        const position = robot.getMousePos();
        positionList.push(position);
    });
    electron_1.globalShortcut.register("CommandOrControl+E", () => {
        positionList.length = 0;
    });
    electron_1.globalShortcut.register("CommandOrControl+K", () => __awaiter(this, void 0, void 0, function* () {
        stopRequest = false;
        let count = 0;
        while (keepDoing) {
            for (let i = 0; i < positionList.length; i++) {
                if (stopRequest) {
                    break;
                }
                robot.moveMouseSmooth(positionList[i].x, positionList[i].y);
                yield delay(1000);
            }
            if (count >= 5) {
                keepDoing = false;
            }
            else {
                count++;
            }
        }
        keepDoing = true;
    }));
    electron_1.ipcMain.handle("move-mouse", () => __awaiter(this, void 0, void 0, function* () {
        const { width, height } = robot.getScreenSize();
        let count = 0;
        while (keepDoing) {
            robot.moveMouseSmooth(50 + width / 2, 50 + height / 2);
            yield delay(1000);
            robot.moveMouseSmooth(-50 + width / 2, -50 + height / 2);
            yield delay(1000);
            if (count >= 5) {
                keepDoing = false;
            }
            else {
                count++;
            }
        }
        keepDoing = true;
    }));
}
exports.default = registRobotHandler;
