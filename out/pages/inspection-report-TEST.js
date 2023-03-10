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
exports.InspectionReport = void 0;
const react_1 = __importStar(require("react"));
const types_1 = require("../types");
const jspdf_1 = require("jspdf");
const inspection_form_TEST_1 = require("../components/inspection-form-TEST");
const negate_button_1 = require("../components/negate-button");
const back_button_1 = require("../components/back-button");
const save_button_1 = require("../components/save-button");
const save_as_pdf_button_1 = require("../components/save-as-pdf-button");
const edit_button_1 = require("../components/edit-button");
;
const InspectionReport = ({ report, setReport, setEditingReport }) => {
    const [state, setState] = (0, react_1.useState)(report.form);
    const [RVInfo, setRVInfo] = (0, react_1.useState)(report.RVInfo);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const saveForm = () => __awaiter(void 0, void 0, void 0, function* () {
        if (report.customer) {
            report.RVInfo = RVInfo;
            yield window.electronAPI.saveReport(report);
            setIsEditing(false);
        }
        else {
            report.form = state;
            yield window.electronAPI.saveReport(report);
            setEditingReport(false);
            setReport(null);
        }
    });
    const saveAsPDF = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const reportElement = document.querySelector(".printable-form");
        const header = reportElement.querySelector(".report-header"); // everythng except the form
        const table = reportElement.querySelector("table");
        const tableRows = table.querySelectorAll("tr");
        const jspdf = new jspdf_1.jsPDF({
            unit: "px",
            format: "letter",
            hotfixes: ["px_scaling"]
        });
        const margin = 16;
        const pageHeight = jspdf.internal.pageSize.getHeight() - (margin * 2);
        let pdf = jspdf;
        let page = document.createElement("div");
        let newTable = document.createElement("table");
        let tbody = document.createElement("tbody");
        page.appendChild(header.cloneNode(true));
        let currentHeight = header.offsetHeight;
        let numberOfPages = 0;
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const height = row.offsetHeight;
            if (i === tableRows.length - 1) {
                tbody.appendChild(row.cloneNode(true));
            }
            ;
            if (pageHeight < currentHeight + height || i === tableRows.length - 1) {
                newTable.appendChild(tbody);
                page.appendChild(newTable);
                yield pdf.html(page, {
                    callback: (doc) => {
                        pdf = doc;
                    },
                    y: pageHeight * numberOfPages,
                    margin: [margin, margin, margin, margin],
                    width: 800 - margin,
                    windowWidth: 800
                });
                currentHeight = height;
                numberOfPages++;
                page = document.createElement("div");
                newTable = document.createElement("table");
                tbody = document.createElement("tbody");
                tbody.appendChild(row.cloneNode(true));
            }
            else {
                tbody.appendChild(row.cloneNode(true));
                currentHeight += height;
            }
            ;
        }
        ;
        const filename = `${report.dateCreated} ${(_a = report.customer) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = report.customer) === null || _b === void 0 ? void 0 : _b.lastName}`;
        pdf.save(`${filename}.pdf`);
    });
    const deleteReport = () => __awaiter(void 0, void 0, void 0, function* () {
        yield window.electronAPI.deleteReport(report.id);
        setReport(null);
    });
    const reportTitle = report.form.type === types_1.InspectionType.MOTORHOME
        ? "Motorhome Inspection Report"
        : "Towable RV Inspection Report";
    const createCustomerInfoSection = (customer) => (react_1.default.createElement("section", null,
        react_1.default.createElement("hr", null),
        react_1.default.createElement("h3", null, "Customer Info"),
        react_1.default.createElement("div", null, `${customer.firstName}${customer.lastName ? ` ${customer.lastName}` : ""}`),
        customer.phone !== "" && react_1.default.createElement("div", null, customer.phone),
        customer.email !== "" && react_1.default.createElement("div", null, customer.email),
        customer.address !== "" && react_1.default.createElement("div", null, customer.address)));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "toolbar" }, !report.customer
            ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(negate_button_1.NegateButton, { onClick: () => setEditingReport(false), text: "Cancel" }),
                react_1.default.createElement(save_button_1.SaveButton, { onClick: () => saveForm() })))
            : (react_1.default.createElement(react_1.default.Fragment, null, isEditing
                ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(save_button_1.SaveButton, { onClick: () => saveForm() }),
                    react_1.default.createElement(negate_button_1.NegateButton, { onClick: () => setIsEditing(false), text: "Cancel" })))
                : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(back_button_1.BackButton, { onClick: () => setReport(null) }),
                    react_1.default.createElement(edit_button_1.EditButton, { onClick: () => setIsEditing(true), text: "Edit Report" }),
                    react_1.default.createElement(save_as_pdf_button_1.SaveAsPDFButton, { onClick: () => saveAsPDF() }),
                    react_1.default.createElement(negate_button_1.NegateButton, { onClick: () => deleteReport(), text: "Delete" })))))),
        react_1.default.createElement("div", { className: "printable-form" },
            react_1.default.createElement("div", { className: "report-header" },
                report.customer
                    ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("h1", null, "On The Spot Mobile RV and Trailer Service"),
                        react_1.default.createElement("h3", null, reportTitle),
                        createCustomerInfoSection(report.customer),
                        react_1.default.createElement("section", null,
                            react_1.default.createElement("hr", null),
                            react_1.default.createElement("h3", null, "Rv Info"),
                            react_1.default.createElement("input", { className: "rv-info", type: "text", value: RVInfo, readOnly: !isEditing, onChange: (e) => setRVInfo(e.target.value) }))))
                    : (react_1.default.createElement(react_1.default.Fragment, null, reportTitle)),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("h3", null, "Report")),
            react_1.default.createElement(inspection_form_TEST_1.InspectionFormTEST, Object.assign({}, { state, setState, isTemplate: !report.customer, editable: isEditing })))));
};
exports.InspectionReport = InspectionReport;
