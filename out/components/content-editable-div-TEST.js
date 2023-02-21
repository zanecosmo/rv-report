"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditableDivTEST = void 0;
const react_1 = __importDefault(require("react"));
;
const ContentEditableDivTEST = (props) => {
    const { state, setState, payload, isEditable } = props;
    const [category, row, data] = payload;
    const handleInputChange = (e) => {
        const newCategories = state.categories.map(c => c);
        if (row === null)
            newCategories[category][data] = e.currentTarget.innerHTML;
        else
            newCategories[category].rows[row][data] = e.currentTarget.innerHTML;
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
    };
    const innerHTML = row === null
        ? state.categories[category][data]
        : state.categories[category].rows[row][data];
    return (react_1.default.createElement("div", { contentEditable: isEditable, onBlur: handleInputChange, dangerouslySetInnerHTML: { __html: innerHTML }, className: "textarea-div" }));
};
exports.ContentEditableDivTEST = ContentEditableDivTEST;
