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
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getTableRow: (type) => electron_1.ipcRenderer.invoke("generic-event", type),
    getCustomerList: () => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("get-customer-list"); }),
    saveCustomerInfo: (customer) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("save-customer", customer); }),
    deleteCustomer: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("delete-customer", id); }),
    getReportList: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("get-report-list", id); }),
    generateReport: (customer, type) => __awaiter(void 0, void 0, void 0, function* () {
        return yield electron_1.ipcRenderer.invoke("generate-report", customer, type);
    }),
    saveReport: (report) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("save-report", report); }),
    deleteReport: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke("delete-report", id); })
});
