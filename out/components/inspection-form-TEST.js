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
    const addCategory = (categoryIndex) => {
        const newCategories = state.categories.map(c => c);
        newCategories.splice(categoryIndex, 0, {
            categoryName: "",
            rows: [],
            notes: ""
        });
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    const addLineItem = (categoryIndex) => {
        const newCategories = state.categories.map(c => c);
        newCategories[categoryIndex].rows.push({
            lineItem: "",
            pass: false,
            fail: false,
            notes: ""
        });
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    const deleteCategory = (categoryIndex) => {
        const newCategories = state.categories.filter((_c, i) => i !== categoryIndex);
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    const deleteLineItem = (categoryIndex, rowIndex) => {
        const newCategories = state.categories.map(c => c);
        newCategories[categoryIndex].rows = newCategories[categoryIndex].rows.filter((_r, i) => i !== rowIndex);
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "List Item"),
                react_1.default.createElement("th", null, "Passed"),
                react_1.default.createElement("th", null, "Failed"),
                react_1.default.createElement("th", null, "Notes"))),
        state.categories.map((category, categoryIndex) => {
            return (react_1.default.createElement("tbody", { key: `category.${categoryIndex.toString()}.key` },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { className: "spacer", colSpan: 4 }, " ")),
                isTemplate && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { colSpan: 4 },
                            react_1.default.createElement("button", { type: "button", onClick: () => addCategory(categoryIndex) }, "+ NEW CATEGORY"))),
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { className: "spacer", colSpan: 4 }, " ")))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "line-item-notes", colSpan: 4 },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, null, "categoryName"],
                            isEditable: isTemplate
                        })),
                        isTemplate && (react_1.default.createElement("button", { type: "button", onClick: () => deleteCategory(categoryIndex) }, "- DELETE CATEGORY")))),
                category.rows.map((_row, rowIndex) => (react_1.default.createElement("tr", { key: `row.${rowIndex}.key` },
                    react_1.default.createElement("td", { className: "line-item-notes" },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, rowIndex, "lineItem"],
                            isEditable: isTemplate
                        }))),
                    react_1.default.createElement("td", { className: "pass-fail" },
                        react_1.default.createElement(checkbox_1.CheckBox, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, rowIndex, "pass"],
                            isEditable: isTemplate
                        }))),
                    react_1.default.createElement("td", { className: "pass-fail" },
                        react_1.default.createElement(checkbox_1.CheckBox, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, rowIndex, "fail"],
                            isEditable: isTemplate
                        }))),
                    react_1.default.createElement("td", { className: "line-item-notes" },
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, rowIndex, "notes"],
                            isEditable: true
                        })),
                        isTemplate && (react_1.default.createElement("button", { type: "button", onClick: () => deleteLineItem(categoryIndex, rowIndex) }, "- DELETE LINE-ITEM")))))),
                isTemplate && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 4 },
                        react_1.default.createElement("button", { type: "button", onClick: () => addLineItem(categoryIndex) }, "+ NEW LINE-ITEM")))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { className: "line-item-notes", colSpan: 4 },
                        react_1.default.createElement("span", null, "Notes:"),
                        react_1.default.createElement(content_editable_div_TEST_1.ContentEditableDivTEST, Object.assign({}, {
                            state,
                            setState,
                            payload: [categoryIndex, null, "notes"],
                            isEditable: true
                        }))))));
        })));
};
exports.InspectionFormTEST = InspectionFormTEST;
