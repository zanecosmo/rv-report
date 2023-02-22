"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = void 0;
const react_1 = __importDefault(require("react"));
const BackButton = ({ onClick }) => {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick },
        react_1.default.createElement("div", { className: "svg-icon" },
            react_1.default.createElement("svg", { viewBox: "0 0 448 512" },
                react_1.default.createElement("path", { fill: "#ffffff", d: "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }))),
        react_1.default.createElement("div", { className: "button-text" }, "Back")));
};
exports.BackButton = BackButton;
