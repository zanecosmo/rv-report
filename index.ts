import path from "path";
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  mainWindow.webContents.openDevTools();

  ipcMain.handle("generic-event", (_event: IpcMainInvokeEvent) => {
    return "<tr><td>BUTT</td></tr>";
  });

  mainWindow.loadFile('index.html')
};

app.on("ready", () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});