import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getTableRow: (type: string) => {
    console.log("HEERE");
    return ipcRenderer.invoke("generic-event", type)
  },
  getCustomerInfo: (id: number) => {
    console.log("HEERE");
    return ipcRenderer.invoke("get-customer-by-id", id)
  }
});

