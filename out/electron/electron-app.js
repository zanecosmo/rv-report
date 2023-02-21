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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/back-end/utils");
const createWindow = () => {
    const preloadPath = (0, utils_1.isDev)()
        ? path_1.default.resolve(__dirname, "./preload.js")
        : path_1.default.resolve(__dirname, "./preload.js");
    const mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: preloadPath
        }
    });
    mainWindow.removeMenu();
    (0, utils_1.isDev)() && mainWindow.webContents.openDevTools();
    electron_1.ipcMain.handle("get-customer-list", (_event) => __awaiter(void 0, void 0, void 0, function* () {
        return utils_1.database.getCustomers();
    }));
    electron_1.ipcMain.handle("save-customer", (_event, customer) => __awaiter(void 0, void 0, void 0, function* () {
        const customers = utils_1.database.getCustomers();
        const index = customers.findIndex(c => c.id === customer.id);
        let id = "";
        if (index !== -1)
            customers[index] = customer;
        else {
            id = (0, uuid_1.v4)();
            customer.id = id;
            customers.push(customer);
        }
        ;
        utils_1.database.saveCustomerInfo(customers);
        return id;
    }));
    electron_1.ipcMain.handle("delete-customer", (_event, id) => __awaiter(void 0, void 0, void 0, function* () {
        const customers = utils_1.database.getCustomers();
        const index = customers.findIndex(c => c.id === id);
        if (index === -1)
            throw Error("CUSTOMER DOESN'T EXIST");
        else
            customers.splice(index, 1);
        utils_1.database.saveCustomerInfo(customers);
    }));
    electron_1.ipcMain.handle("generate-report", (_event, customer, type) => __awaiter(void 0, void 0, void 0, function* () {
        const form = utils_1.database.getReportTemplate(type);
        const report = {
            id: customer ? (0, uuid_1.v4)() : null,
            customer: customer,
            RVInfo: "",
            dateCreated: customer ? new Date() : null,
            form: form
        };
        return report;
    }));
    electron_1.ipcMain.handle("save-report", (_event, report) => __awaiter(void 0, void 0, void 0, function* () {
        if (report.customer === null) {
            console.log("NO CUSTOMER");
            console.log(report.form);
            utils_1.database.saveReportTemplate(report.form);
            return;
        }
        ;
        const reportList = utils_1.database.getReportList();
        const index = reportList.findIndex(r => r.id === report.id);
        if (index !== -1)
            reportList[index] = report;
        else
            reportList.push(report);
        utils_1.database.saveReportList(reportList);
    }));
    electron_1.ipcMain.handle("delete-report", (_event, id) => __awaiter(void 0, void 0, void 0, function* () {
        const reportList = utils_1.database.getReportList();
        const index = reportList.findIndex(r => r.id === id);
        if (index === -1)
            throw Error("REPORT DOESN'T EXIST");
        else
            reportList.splice(index, 1);
        utils_1.database.saveReportList(reportList);
    }));
    electron_1.ipcMain.handle("get-report-list", (_event, id) => __awaiter(void 0, void 0, void 0, function* () {
        return utils_1.database.getReportList().filter(report => report.customer.id === id);
    }));
    const HTMLPath = (0, utils_1.isDev)()
        ? path_1.default.resolve(__dirname, "../../public/index.html")
        : path_1.default.resolve(__dirname, "../../public/index.html");
    mainWindow.loadFile(HTMLPath);
};
electron_1.app.on("ready", () => createWindow());
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
