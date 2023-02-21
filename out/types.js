"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionType = exports.isInputType = void 0;
const isInputType = (any) => {
    return (typeof any === "string" || typeof any === "boolean" || any instanceof Date) ? true : false;
};
exports.isInputType = isInputType;
;
;
;
;
;
;
;
///////////////////////////
var InspectionType;
(function (InspectionType) {
    InspectionType["TOWABLE"] = "towable";
    InspectionType["MOTORHOME"] = "motorhome";
})(InspectionType = exports.InspectionType || (exports.InspectionType = {}));
;
;
;
;
;
;
