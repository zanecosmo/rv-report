"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.isDev = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const isDev = () => {
    var _a;
    // console.log(require.main ? require.main.filename : "NO MAIN");
    return ((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename.indexOf("app.asar")) === -1;
};
exports.isDev = isDev;
const dbPath = path_1.default.join(electron_1.app.getPath("userData"), "json-database");
if (!fs_1.default.existsSync(dbPath)) {
    fs_1.default.mkdir(dbPath, { recursive: true }, (error) => {
        if (error && error.code === "ENOENT")
            return;
        else
            throw error;
    });
}
;
const customerInfoPath = path_1.default.join(dbPath, "customer-info.json");
const reportsListPath = path_1.default.join(dbPath, "reports.json");
const isError = (error) => {
    return error instanceof Error;
};
const getTemplatePath = (type) => {
    return (0, exports.isDev)()
        ? `./db/templates/${type}-template.json`
        : `../../db/templates/${type}-template.json`;
};
exports.database = {
    getCustomers: () => {
        try {
            return JSON.parse(fs_1.default.readFileSync(customerInfoPath, "utf-8"));
        }
        catch (error) {
            if (isError(error) && error.code === "ENOENT")
                return [];
            else
                throw error;
        }
        ;
    },
    saveCustomerInfo: (customers) => {
        fs_1.default.writeFileSync(customerInfoPath, JSON.stringify(customers));
    },
    getReportTemplate: (type) => {
        return JSON.parse(fs_1.default.readFileSync(getTemplatePath(type)).toString());
    },
    // this is not used yet
    saveReportTemplate: (form) => {
        fs_1.default.writeFileSync(getTemplatePath(form.type), JSON.stringify(form));
    },
    getReportList: () => {
        try {
            return JSON.parse(fs_1.default.readFileSync(reportsListPath, "utf-8"));
        }
        catch (error) {
            if (isError(error) && error.code === "ENOENT")
                return [];
            else
                throw error;
        }
        ;
    },
    saveReportList: (reports) => fs_1.default.writeFileSync(reportsListPath, JSON.stringify(reports))
};
