"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractForm = exports.database = void 0;
const fs_1 = __importDefault(require("fs"));
exports.database = {
    grabLineItems: () => fs_1.default.readFileSync("./db/line-items.txt").toString(),
    grabCustomerInfo: () => JSON.parse(fs_1.default.readFileSync("customer-info.json").toString()),
    updateCustomerInfo: (customerInfo) => {
        fs_1.default.writeFileSync("customer-info.json", JSON.stringify(customerInfo));
    }
};
const extractForm = (items, formType) => {
    const categories = items.split("\r\n\r\n"); // entire category, including line-items and notes
    const categoriesArray = [];
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        if (categories[i].split(" ")[0] === "**" && formType !== "motorhome")
            continue;
        const lineItems = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes
        if (lineItems.length === 0)
            continue;
        const category = lineItems.shift(); // title
        const rows = [];
        for (let i = 0; i < lineItems.length; i++) { // line-items and notes
            if (lineItems[i].split(" ")[0] === "--") {
                let notes = rows[rows.length - 1].notes;
                rows[rows.length - 1].notes = notes ? notes += ` ${lineItems[i]}` : lineItems[i];
            }
            else {
                rows.push({
                    lineItem: lineItems[i],
                    pass: false,
                    fail: false,
                    notes: ""
                });
            }
            ;
        }
        ;
        categoriesArray.push({
            categoryName: category,
            formRows: rows,
            notes: ""
        });
    }
    ;
    return categoriesArray;
};
exports.extractForm = extractForm;
