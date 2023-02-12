"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
;
exports.Customers = {
    list: [],
    getCustomerList: function (vnode) {
        exports.Customers.list = window.electronAPI.getCustomerList();
    }
};
