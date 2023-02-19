"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unflatten = exports.flatten = void 0;
const flatten = (item, keyString = "") => {
    let result = {};
    if (Array.isArray(item)) {
        item.forEach((val, index) => {
            const newKey = `${keyString}${keyString === "" ? "" : "."}${index.toString()}`;
            result = Object.assign(Object.assign({}, result), (0, exports.flatten)(val, newKey));
        });
    }
    else if (typeof item === "object") { // 2
        let key;
        for (key in item) {
            const newKey = `${keyString}${keyString === "" ? "" : "."}${key}`;
            result = Object.assign(Object.assign({}, result), (0, exports.flatten)(item[key], newKey));
        }
        ;
    }
    else
        result = { [keyString]: item };
    return result;
};
exports.flatten = flatten;
const embed = (result, substrings, value) => {
    const stringKey = substrings.shift();
    if (stringKey === undefined)
        return value;
    const position = parseInt(stringKey, 10);
    const isObject = isNaN(position);
    if (result === undefined)
        result = isObject ? {} : [];
    if (isObject) {
        result[stringKey] = embed(result[stringKey], substrings, value);
        return result;
    }
    else {
        result[position] = embed(result[position], substrings, value);
        return result;
    }
    ;
};
const unflatten = (state) => {
    let result = undefined;
    let key;
    for (key in state) {
        const value = state[key];
        const substrings = key.split(".");
        result = embed(result, substrings, value);
    }
    ;
    return result;
};
exports.unflatten = unflatten;
