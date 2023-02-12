import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getTableRow: (type: string) => ipcRenderer.invoke("generic-event", type),
  getCustomerList: async () => await ipcRenderer.invoke("get-customer-list")
});

