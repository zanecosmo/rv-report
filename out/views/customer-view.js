"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersView = void 0;
const mithril_1 = __importDefault(require("mithril"));
const customers_1 = require("../models/customers");
const CustomersView = {
    oninit: customers_1.Customers.getCustomerList,
    view: () => (0, mithril_1.default)(".customer-list", customers_1.Customers.list.map(customer => {
        return (0, mithril_1.default)(".customer", `${customer.firstName} ${customer.lastName}`);
    }))
};
exports.CustomersView = CustomersView;
