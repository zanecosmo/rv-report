import { Vnode, _NoLifecycle } from "mithril";
import { CustomerInfo } from "../types";

interface Customer {
  list: CustomerInfo[],
  getCustomerList: () => Promise<void>
};

export const Customers: Customer = {
  list: [],
  getCustomerList: async (): Promise<void> => {
    const data = await window.electronAPI.getCustomerList();
    // console.log(Customers.list)
    Customers.list = data;
    // console.log(Customers.list)
  }
};