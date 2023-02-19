"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ChooseInspectionType = void 0;
const react_1 = __importStar(require("react"));
const inspection_report_1 = require("./inspection-report");
const types_1 = require("../types");
;
const ChooseInspectionType = ({ customer, setAddingReport }) => {
    const [report, setReport] = (0, react_1.useState)(null);
    const getInspection = (type) => __awaiter(void 0, void 0, void 0, function* () {
        const report = yield window.electronAPI.generateReport(customer, type);
        setReport(report);
    });
    if (report)
        return react_1.default.createElement(inspection_report_1.InspectionReport, Object.assign({}, { report, setReport, setAddingReport }));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("button", { type: "button", onClick: () => setAddingReport(false) }, "Cancel"),
        react_1.default.createElement("h3", null, "Choose Type:"),
        react_1.default.createElement("button", { type: "button", onClick: () => getInspection(types_1.InspectionType.TOWABLE) }, "Towable"),
        react_1.default.createElement("button", { type: "button", onClick: () => getInspection(types_1.InspectionType.MOTORHOME) }, "Motorhome")));
};
exports.ChooseInspectionType = ChooseInspectionType;
