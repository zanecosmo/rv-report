import { contextBridge, ipcRenderer } from "electron";
import { CustomerInfo } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  getTableRow: (type: string) => ipcRenderer.invoke("generic-event", type),
  getCustomerList: async () => await ipcRenderer.invoke("get-customer-list"),
  saveCustomerInfo: async (customer: CustomerInfo) => await ipcRenderer.invoke("save-customer-info", customer),
  deleteCustomer: async (customer: CustomerInfo) => await ipcRenderer.invoke("delete-customer", customer)
});

