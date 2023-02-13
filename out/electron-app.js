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
exports.extractForm = exports.database = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const electron_1 = require("electron");
// import { UUID } from "uuidjs";
// const uuid: string = UUID.generate();
exports.database = {
    grabLineItems: () => fs_1.default.readFileSync("./db/line-items.txt").toString(),
    grabCustomerInfo: () => JSON.parse(fs_1.default.readFileSync("./db/customer-info.json").toString()),
    updateCustomerInfo: (customerInfo) => {
        fs_1.default.writeFileSync("customer-info.json", JSON.stringify(customerInfo));
    }
};
// get customer id
// go into report file
// parse report file
// get the reports that are associated with the customer
const extractForm = (items, formType) => {
    const categories = items.split("\r\n\r\n"); // entire category, including line-items and notes
    const categoriesArray = [];
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        if (categories[i].split(" ")[0] === "**" && formType !== "motorhome")
            continue;
        const lineItems = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes
        if (lineItems.length === 0)
            continue;
        const category = lineItems.shift(); // title
        const rows = [];
        for (let i = 0; i < lineItems.length; i++) { // line-items and notes
            if (lineItems[i].split(" ")[0] === "--") {
                let notes = rows[rows.length - 1].notes;
                rows[rows.length - 1].notes = notes ? notes += ` ${lineItems[i]}` : lineItems[i];
            }
            else {
                rows.push({
                    lineItem: lineItems[i],
                    pass: false,
                    fail: false,
                    notes: ""
                });
            }
            ;
        }
        ;
        categoriesArray.push({
            categoryName: category,
            formRows: rows,
            notes: ""
        });
    }
    ;
    return categoriesArray;
};
exports.extractForm = extractForm;
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "./preload.js")
        }
    });
    mainWindow.webContents.openDevTools();
    electron_1.ipcMain.handle("generic-event", (_event, type) => {
        return (0, exports.extractForm)(exports.database.grabLineItems(), type);
    });
    electron_1.ipcMain.handle("get-customer-list", (_event) => __awaiter(void 0, void 0, void 0, function* () {
        return exports.database.grabCustomerInfo();
    }));
    mainWindow.loadFile('../public/index.html');
};
electron_1.app.on("ready", () => createWindow());
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});