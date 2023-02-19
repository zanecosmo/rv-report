"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionForm = void 0;
const react_1 = __importDefault(require("react"));
const content_editable_div_1 = require("./content-editable-div");
;
;
const InspectionForm = ({ state, setState }) => {
    const handleInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState(Object.assign(Object.assign({}, state), { [e.target.name]: value }));
    };
    const keys = Object.keys(state);
    const splitIntoCategories = () => {
        const categories = [];
        let category = [];
        let index = 0;
        keys.forEach(key => {
            const substrings = key.split(".");
            if (parseInt(substrings[0]) === index)
                category.push(key);
            else {
                categories.push(category);
                index++;
                category = [key];
            }
            ;
        });
        categories.push(category);
        return categories;
    };
    const categories = splitIntoCategories();
    const divideCategory = (category) => ({
        categoryName: category.shift(),
        notes: category.pop(),
        rows: category
    });
    const generateCategory = (categoryKeys) => (react_1.default.createElement("tbody", { key: `${categoryKeys.categoryName}.key` },
        react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { className: "spacer", colSpan: 4 }, " ")),
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { className: "line-item-notes", colSpan: 4 },
                react_1.default.createElement(content_editable_div_1.ContentEditableDiv, { state: state, setState: setState, stateKey: categoryKeys.categoryName }))),
        generateRows(categoryKeys),
        react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { className: "line-item-notes", colSpan: 4 },
                react_1.default.createElement("span", null, "Notes:"),
                react_1.default.createElement(content_editable_div_1.ContentEditableDiv, { state: state, setState: setState, stateKey: categoryKeys.notes })))));
    const generateRows = (categoryKeys) => {
        const rows = [];
        for (let i = 0; i < categoryKeys.rows.length; i += 4) {
            const lineItem = categoryKeys.rows[i];
            const pass = categoryKeys.rows[i + 1];
            const fail = categoryKeys.rows[i + 2];
            const notes = categoryKeys.rows[i + 3];
            const row = createRow(i, lineItem, pass, fail, notes);
            rows.push(row);
        }
        ;
        return rows;
    };
    const createRow = (key, lineItem, pass, fail, notes) => (react_1.default.createElement("tr", { key: key },
        react_1.default.createElement("td", { className: "line-item-notes" },
            react_1.default.createElement(content_editable_div_1.ContentEditableDiv, { state: state, setState: setState, stateKey: lineItem })),
        react_1.default.createElement("td", { className: "pass-fail" },
            react_1.default.createElement("label", { className: "checkbox" },
                react_1.default.createElement("input", { key: pass, type: "checkbox", name: pass, checked: state[pass], onChange: handleInputChange }),
                react_1.default.createElement("span", { className: "overlay" },
                    react_1.default.createElement("div", { className: "icon-container" },
                        react_1.default.createElement("div", { className: "icon" }))))),
        react_1.default.createElement("td", { className: "pass-fail" },
            react_1.default.createElement("label", { className: "checkbox" },
                react_1.default.createElement("input", { key: fail, type: "checkbox", name: fail, checked: state[fail], onChange: handleInputChange }),
                react_1.default.createElement("span", { className: "overlay" },
                    react_1.default.createElement("div", { className: "icon-container" },
                        react_1.default.createElement("div", { className: "icon" }))))),
        react_1.default.createElement("td", { className: "line-item-notes" },
            react_1.default.createElement(content_editable_div_1.ContentEditableDiv, { state: state, setState: setState, stateKey: notes }))));
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "List Item"),
                react_1.default.createElement("th", null, "Passed"),
                react_1.default.createElement("th", null, "Failed"),
                react_1.default.createElement("th", null, "Notes"))),
        categories.map((category) => {
            const categoryKeys = divideCategory(category);
            return generateCategory(categoryKeys);
        })));
};
exports.InspectionForm = InspectionForm;
