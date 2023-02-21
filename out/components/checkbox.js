"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
const react_1 = __importDefault(require("react"));
;
const CheckBox = ({ state, setState, payload }) => {
    const [category, row, data] = payload;
    const handleCheckboxChange = (e) => {
        const newCategories = state.categories.map(c => c);
        newCategories[category].rows[row][data] = e.target.checked;
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    return (react_1.default.createElement("label", { className: "checkbox" },
        react_1.default.createElement("input", { type: "checkbox", checked: state.categories[category].rows[row][data], onChange: handleCheckboxChange }),
        react_1.default.createElement("span", { className: "overlay" },
            react_1.default.createElement("div", { className: "icon-container" },
                react_1.default.createElement("div", { className: "icon" })))));
};
exports.CheckBox = CheckBox;
