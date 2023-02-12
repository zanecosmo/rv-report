import { Vnode, _NoLifecycle } from "mithril";
import { CustomerInfo } from "../types";

interface Customer {
  list: CustomerInfo[],
  getCustomerList: (this: _NoLifecycle<any>, vnode: Vnode<any, _NoLifecycle<any>>) => void
};

export const Customers: Customer = {
  list: [],
  getCustomerList: function(this: _NoLifecycle<any>, vnode: Vnode<any, _NoLifecycle<any>>): void {
    Customers.list = window.electronAPI.getCustomerList();
  }
};