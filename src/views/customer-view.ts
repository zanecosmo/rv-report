import m, { ComponentTypes } from "mithril";
import { Customers } from "../models/customers";

const CustomersView: ComponentTypes<any, any> = {
  oninit: Customers.getCustomerList,
  view: () => m(".customer-list", Customers.list.map(customer => {
    return m(".customer", `${customer.firstName} ${customer.lastName}`);
  }))
};

export { CustomersView };