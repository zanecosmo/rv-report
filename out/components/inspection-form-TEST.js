"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionFormTEST = void 0;
const react_1 = __importDefault(require("react"));
const content_editable_div_TEST_1 = require("./content-editable-div-TEST");
const checkbox_1 = require("./checkbox");
;
const InspectionFormTEST = ({ state, setState, isTemplate }) => {
    const addCategory = () => {
        console.log("ADD CAEGORY PRESSED");
    };
    const buildTable = () => {
        console.log(state.categories);
        return state.categories.map((category, categoryIndex) => {
            console.log(category, categoryIndex);
            return (react_1.default.createElement("tbody", { key: `category.${categoryIndex.toString()}.key` },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { className: "spacer", colSpan: 4 }, " ")),
                isTemplate && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 4 },
                        react_1.default.createElement("button", { type: "button", onClick: () => addCategory() }, "NEW CATEGORY")),
                    react_1.default.createElement("td", { className: "spacer", colSpan: 4 }, " "))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "line-item-notes", colSpan: 4 },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, { state, setState, payload: [categoryIndex, null, "categoryName"] })))),
                category.rows.map((row, rowIndex) => (react_1.default.createElement("tr", { key: `row.${rowIndex}.key` },
                    react_1.default.createElement("td", { className: "line-item-notes" },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, { state, setState, payload: [categoryIndex, rowIndex, "lineItem"] }))),
                    react_1.default.createElement("td", { className: "pass-fail" },
                        react_1.default.createElement(checkbox_1.CheckBox, Object.assign({}, { state, setState, payload: [categoryIndex, rowIndex, "pass"] }))),
                    react_1.default.createElement("td", { className: "pass-fail" },
                        react_1.default.createElement(checkbox_1.CheckBox, Object.assign({}, { state, setState, payload: [categoryIndex, rowIndex, "fail"] }))),
                    react_1.default.createElement("td", { className: "line-item-notes" },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, { state, setState, payload: [categoryIndex, rowIndex, "notes"] })))))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { className: "line-item-notes", colSpan: 4 },
                        react_1.default.createElement("span", null, "Notes:"),
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, { state, setState, payload: [categoryIndex, null, "notes"] }))))));
        });
    };
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "List Item"),
                react_1.default.createElement("th", null, "Passed"),
                react_1.default.createElement("th", null, "Failed"),
                react_1.default.createElement("th", null, "Notes"))),
        buildTable()));
};
exports.InspectionFormTEST = InspectionFormTEST;
