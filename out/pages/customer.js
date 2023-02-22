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
exports.CustomerView = void 0;
const react_1 = __importStar(require("react"));
const choose_inspection_type_1 = require("./choose-inspection-type");
const inspection_report_TEST_1 = require("./inspection-report-TEST");
const back_button_1 = require("../components/back-button");
const edit_button_1 = require("../components/edit-button");
const negate_button_1 = require("../components/negate-button");
const save_button_1 = require("../components/save-button");
const add_button_1 = require("../components/add-button");
;
const CustomerView = ({ customer, setCustomer }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(customer.id === "" ? true : false);
    const [addingReport, setAddingReport] = (0, react_1.useState)(false);
    const [reports, setReports] = (0, react_1.useState)([]);
    const [report, setReport] = (0, react_1.useState)(null);
    const getReportList = (id) => __awaiter(void 0, void 0, void 0, function* () { return setReports(yield window.electronAPI.getReportList(id)); });
    (0, react_1.useEffect)(() => {
        if (customer.id === "" || addingReport)
            return;
        getReportList(customer.id);
    }, [addingReport, report]);
    const handleChange = (e) => {
        setCustomer(Object.assign(Object.assign({}, customer), { [e.target.name]: e.target.value }));
    };
    const saveCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
        const id = yield window.electronAPI.saveCustomerInfo(customer);
        if (id)
            setCustomer(Object.assign(Object.assign({}, customer), { id: id }));
        setIsEditing(false);
    });
    const deleteCustomer = () => {
        window.electronAPI.deleteCustomer(customer.id);
        setCustomer(null);
    };
    if (report)
        return react_1.default.createElement(inspection_report_TEST_1.InspectionReportTEST, Object.assign({}, { report, setReport, setEditingReport: setAddingReport }));
    else if (addingReport)
        return (react_1.default.createElement(choose_inspection_type_1.ChooseInspectionType, Object.assign({}, { customer, setEditingReport: setAddingReport })));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("section", null,
            react_1.default.createElement("div", { className: "toolbar" }, isEditing
                ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(negate_button_1.NegateButton, { onClick: () => customer.id === "" ? setCustomer(null) : setIsEditing(false), text: "Cancel" }),
                    react_1.default.createElement(save_button_1.SaveButton, { onClick: saveCustomer })))
                : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(back_button_1.BackButton, { onClick: () => setCustomer(null) }),
                    react_1.default.createElement(edit_button_1.EditButton, { onClick: () => setIsEditing(true), text: "Edit" }),
                    react_1.default.createElement(negate_button_1.NegateButton, { onClick: deleteCustomer, text: "Delete" })))),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("h3", null, "Customer Info"),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "First Name"),
            react_1.default.createElement("input", { type: "text", name: "firstName", value: customer.firstName, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "lastName" }, "Last Name"),
            react_1.default.createElement("input", { type: "text", name: "lastName", value: customer.lastName, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "address" }, "Address"),
            react_1.default.createElement("input", { type: "text", name: "address", value: customer.address, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "phone" }, "Phone Number"),
            react_1.default.createElement("input", { type: "text", name: "phone", value: customer.phone, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("input", { type: "text", name: "email", value: customer.email, onChange: handleChange, readOnly: !isEditing })),
        react_1.default.createElement("section", null, !isEditing && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "reports-header" },
                react_1.default.createElement("h3", null, "Reports:"),
                react_1.default.createElement(add_button_1.AddButton, { onClick: () => setAddingReport(true), text: "Add Report" })),
            reports.length === 0
                ? react_1.default.createElement("div", null, "NO REPORTS")
                : reports.map(report => {
                    return (react_1.default.createElement("div", { className: "report", key: report.id, onClick: () => setReport(report) }, `${report.dateCreated} ${report.RVInfo}`));
                }))))));
};
exports.CustomerView = CustomerView;
