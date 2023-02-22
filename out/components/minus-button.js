"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinusButton = void 0;
const react_1 = __importDefault(require("react"));
const MinusButton = ({ onClick }) => {
    return (react_1.default.createElement("button", { className: "minus", type: "button", onClick: onClick },
        react_1.default.createElement("div", { className: "svg-minus" },
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
                react_1.default.createElement("path", { fill: "#c42222", d: "M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" })))));
};
exports.MinusButton = MinusButton;
