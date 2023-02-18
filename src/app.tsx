import React, { FC, useEffect, useState } from "react";
import { CustomerView } from "./customer";
import { Customer } from "./types";

export const App: FC = (): JSX.Element => {
  const [ customers, setCustomers ] = useState<Customer[]>([]);
  const [ customer, setCustomer ] = useState<Customer | null>(null);

  const getCustomerList = async () => setCustomers(await window.electronAPI.getCustomerList());

  const getCustomer = async (id: string) => {
    const customer = customers.find(customer => customer.id === id);
    if (customer) setCustomer(customer);
    else throw Error("INVALID CUSTOMER");
  };

  const createNewCustomer = () => {
    setCustomer({
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: ""
    });
  };

  useEffect(() => void getCustomerList(), [customer])

  if (customer === null) return (
    <>
      <button type="button" onClick={() => createNewCustomer()}>Add Customer</button>
      <div className="customer-list"> Customers:
        {customers && customers.map((customer: Customer) => {
          return (
            <div className="customer" key={customer.id} onClick={() => getCustomer(customer.id!)}>
              {`${customer.firstName} ${customer.lastName}`}
            </div>
          )
        })}
      </div>
    </>
  );

  return (<CustomerView { ...{ customer, setCustomer } } />);
};