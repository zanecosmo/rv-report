import { contextBridge, ipcRenderer } from "electron";
import { Customer, Form, InspectionType, Report } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  getTableRow: (type: string) => ipcRenderer.invoke("generic-event", type),
  getCustomerList: async () => await ipcRenderer.invoke("get-customer-list"),
  saveCustomerInfo: async (customer: Customer) => await ipcRenderer.invoke("save-customer", customer),
  deleteCustomer: async (id: string) => await ipcRenderer.invoke("delete-customer", id),
  getReportList: async (id: string) => await ipcRenderer.invoke("get-report-list", id),
  generateReport: async (customer: Customer | null, type: InspectionType): Promise<Report> => {
    return await ipcRenderer.invoke("generate-report", customer, type);
  },
  saveReport: async (report: Report) => await ipcRenderer.invoke("save-report", report),
  deleteReport: async (id: string) => await ipcRenderer.invoke("delete-report", id)
});

