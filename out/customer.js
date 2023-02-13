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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const react_1 = __importStar(require("react"));
;
;
const generateCustomerInitialState = (customer) => {
    return customer === null
        ? {
            id: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            email: ""
        }
        : {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
            phone: customer.phone,
            email: customer.email
        };
};
const Customer = ({ customer, setCustomer }) => {
    console.log(customer);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [formState, setFormState] = (0, react_1.useState)(generateCustomerInitialState(customer));
    const handleChange = (e) => {
        setFormState(Object.assign(Object.assign({}, formState), { [e.target.name]: e.target.value }));
    };
    return (react_1.default.createElement("section", null,
        react_1.default.createElement("button", { type: "button", onClick: () => setIsEditing(true) }, "Edit Customer"),
        react_1.default.createElement("h3", null, "Customer Info"),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("label", { htmlFor: "firstName" }, "First Name"),
        react_1.default.createElement("input", { type: "text", name: "firstName", value: formState.firstName, onChange: handleChange, readOnly: !isEditing }),
        react_1.default.createElement("label", { htmlFor: "lastName" }, "Last Name"),
        react_1.default.createElement("input", { type: "text", name: "lastName", value: formState.lastName, onChange: handleChange, readOnly: !isEditing }),
        react_1.default.createElement("label", { htmlFor: "address" }, "Address"),
        react_1.default.createElement("input", { type: "text", name: "address", value: formState.address, onChange: handleChange, readOnly: !isEditing }),
        react_1.default.createElement("label", { htmlFor: "phone" }, "Phone Number"),
        react_1.default.createElement("input", { type: "phone", name: "address", value: formState.phone, onChange: handleChange, readOnly: !isEditing }),
        react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
        react_1.default.createElement("input", { type: "email", name: "address", value: formState.email, onChange: handleChange, readOnly: !isEditing })));
};
exports.Customer = Customer;
