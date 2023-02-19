"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditableDiv = void 0;
const react_1 = __importDefault(require("react"));
;
const ContentEditableDiv = ({ state, setState, stateKey }) => {
    const handleInputChange = (e) => {
        setState(Object.assign(Object.assign({}, state), { [stateKey]: e.currentTarget.innerHTML }));
    };
    return (react_1.default.createElement("div", { contentEditable: true, onBlur: handleInputChange, dangerouslySetInnerHTML: { __html: state[stateKey].toString() }, className: "textarea-div" }));
};
exports.ContentEditableDiv = ContentEditableDiv;
