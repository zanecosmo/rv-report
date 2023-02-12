"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getTableRow: (type) => {
        console.log("HEERE");
        return electron_1.ipcRenderer.invoke("generic-event", type);
    },
    getCustomerInfo: (id) => {
        console.log("HEERE");
        return electron_1.ipcRenderer.invoke("get-customer-by-id", id);
    }
});
