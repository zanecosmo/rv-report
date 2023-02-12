"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js")
        }
    });
    mainWindow.webContents.openDevTools();
    electron_1.ipcMain.handle("generic-event", (_event) => {
        return "<tr><td>BUTT</td></tr>";
    });
    mainWindow.loadFile('index.html');
};
electron_1.app.on("ready", () => createWindow());
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
