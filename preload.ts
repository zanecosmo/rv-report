import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getTableRow: () => {
    console.log("HEERE");
    return ipcRenderer.invoke("generic-event")
  }
});

