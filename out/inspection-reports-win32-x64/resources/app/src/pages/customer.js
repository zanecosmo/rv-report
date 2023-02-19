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
const inspection_report_1 = require("./inspection-report");
;
const CustomerView = ({ customer, setCustomer }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(customer.id === "" ? true : false);
    const [formState, setFormState] = (0, react_1.useState)(customer);
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
        setFormState(Object.assign(Object.assign({}, formState), { [e.target.name]: e.target.value }));
    };
    const saveCustomer = () => {
        window.electronAPI.saveCustomerInfo(formState);
        setIsEditing(false);
    };
    const deleteCustomer = () => {
        window.electronAPI.deleteCustomer(customer.id);
        setCustomer(null);
    };
    if (report)
        return react_1.default.createElement(inspection_report_1.InspectionReport, Object.assign({}, { report, setReport, setAddingReport }));
    else if (addingReport)
        return (react_1.default.createElement(choose_inspection_type_1.ChooseInspectionType, Object.assign({}, { customer, setAddingReport })));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("section", null,
            isEditing
                ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { type: "button", onClick: saveCustomer }, "Save"),
                    react_1.default.createElement("button", { type: "button", onClick: () => customer.id === "" ? setCustomer(null) : setIsEditing(false) }, "Cancel")))
                : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { type: "button", onClick: () => setIsEditing(true) }, "Edit Customer"),
                    react_1.default.createElement("button", { type: "button", onClick: () => setCustomer(null) }, "Back"),
                    react_1.default.createElement("button", { type: "button", onClick: deleteCustomer }, "Delete Customer"))),
            react_1.default.createElement("h3", null, "Customer Info"),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "First Name"),
            react_1.default.createElement("input", { type: "text", name: "firstName", value: formState.firstName, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "lastName" }, "Last Name"),
            react_1.default.createElement("input", { type: "text", name: "lastName", value: formState.lastName, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "address" }, "Address"),
            react_1.default.createElement("input", { type: "text", name: "address", value: formState.address, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "phone" }, "Phone Number"),
            react_1.default.createElement("input", { type: "text", name: "phone", value: formState.phone, onChange: handleChange, readOnly: !isEditing }),
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("input", { type: "text", name: "email", value: formState.email, onChange: handleChange, readOnly: !isEditing })),
        react_1.default.createElement("section", null, !isEditing && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("button", { type: "button", onClick: () => setAddingReport(true) }, "Add Report"),
            reports.length === 0
                ? react_1.default.createElement("div", null, "NO REPORTS")
                : reports.map(report => {
                    return (react_1.default.createElement("div", { className: "report", key: report.id, onClick: () => setReport(report) }, `${report.form.type} ${report.dateCreated}`));
                }))))));
};
exports.CustomerView = CustomerView;
