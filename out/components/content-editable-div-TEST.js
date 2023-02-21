"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditableDivTEST = void 0;
const react_1 = __importDefault(require("react"));
;
const ContentEditableDivTEST = ({ state, setState, payload }) => {
    const [category, row, data] = payload;
    const handleInputChange = (e) => {
        const newCategories = state.categories.map(c => c);
        if (row === null)
            newCategories[category][data] = e.currentTarget.innerHTML;
        else
            newCategories[category].rows[row][data] = e.currentTarget.innerHTML;
        setState(Object.assign(Object.assign({}, state), { categories: newCategories }));
        ///
        // const newRow: RowTEST = {
        //   ...state.categories[category].rows[row],
        //   [data]: e.currentTarget.innerHTML
        // };
        // const newRows: RowTEST[] = state.categories[category].rows.map((r, i) => {
        //   return i === row ? newRow : r;
        // });
        // const newCategory: CategoryTEST = {
        //   ...state.categories[category],
        //   rows: newRows
        // };
        // const newCategories: CategoryTEST[] = state.categories.map((c, i) => {
        //   return i === category ? newCategory : c;
        // });
        // setState({
        //   ...state,
        //   categories: newCategories
        // });
    };
    const innerHTML = row === null
        ? state.categories[category][data]
        : state.categories[category].rows[row][data];
    return (react_1.default.createElement("div", { contentEditable: true, onBlur: handleInputChange, dangerouslySetInnerHTML: { __html: innerHTML }, className: "textarea-div" }));
};
exports.ContentEditableDivTEST = ContentEditableDivTEST;
