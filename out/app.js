"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importStar(require("react"));
const customer_1 = require("./customer");
const App = () => {
    const [customers, setCustomers] = (0, react_1.useState)([]);
    const [customer, setCustomer] = (0, react_1.useState)(null);
    const getCustomerList = () => __awaiter(void 0, void 0, void 0, function* () { return setCustomers(yield window.electronAPI.getCustomerList()); });
    const getCustomer = (id) => {
        const customer = customers.find(customer => customer.id === id);
        if (customer)
            setCustomer(customer);
        else
            throw Error("INVALID CUSTOMER");
    };
    (0, react_1.useEffect)(() => void getCustomerList(), []);
    if (customer === null)
        return (react_1.default.createElement("div", { className: "customer-list" },
            " HELLO THER",
            customers && customers.map(customer => {
                return (react_1.default.createElement("div", { key: customer.id, onClick: () => getCustomer(customer.id) }, `${customer.firstName} ${customer.lastName}`));
            })));
    const customerProps = {
        customer: customer,
        setCustomer: setCustomer
    };
    return (react_1.default.createElement(customer_1.Customer, Object.assign({}, customerProps)));
};
exports.App = App;
