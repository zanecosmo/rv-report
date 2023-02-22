"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddButton = void 0;
const react_1 = __importDefault(require("react"));
;
const AddButton = ({ onClick, text }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick },
        react_1.default.createElement("div", { className: "svg-icon" },
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
                react_1.default.createElement("path", { fill: "#ffffff", d: "M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" }))),
        react_1.default.createElement("div", { className: "button-text" }, text)));
};
exports.AddButton = AddButton;
