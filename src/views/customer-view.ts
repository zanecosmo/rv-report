import m, { ComponentTypes, Vnode } from "mithril";
import { Customers } from "../models/customers";

const CustomersView: ComponentTypes = {
  oninit: async () => {
    // console.log("HERE");
    await Customers.getCustomerList();
    m.redraw();
  },
  view: (vnode: Vnode) => {
    console.log(vnode)
    console.log(Customers.list);
    return m(".customer-list", Customers.list.map(customer => {
      console.log(customer);
      return m(".customer", {}, `${customer.firstName} ${customer.lastName}`);
    }))
  }
};

export { CustomersView };