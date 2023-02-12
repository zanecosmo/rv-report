"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersView = void 0;
const mithril_1 = __importDefault(require("mithril"));
const customers_1 = require("../models/customers");
const CustomersView = {
    oninit: () => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("HERE");
        yield customers_1.Customers.getCustomerList();
        mithril_1.default.redraw();
    }),
    view: (vnode) => {
        console.log(vnode);
        console.log(customers_1.Customers.list);
        return (0, mithril_1.default)(".customer-list", customers_1.Customers.list.map(customer => {
            console.log(customer);
            return (0, mithril_1.default)(".customer", {}, `${customer.firstName} ${customer.lastName}`);
        }));
    }
};
exports.CustomersView = CustomersView;
