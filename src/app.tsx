import React, { FC, useEffect, useState } from "react";
import { Customer, CustomerProps } from "./customer";
import { CustomerInfo } from "./types";

export const App: FC = (): JSX.Element => {
  const [ customers, setCustomers ] = useState<CustomerInfo[]>([]);
  const [ customer, setCustomer ] = useState<CustomerInfo | null>(null);

  const getCustomerList = async () => setCustomers(await window.electronAPI.getCustomerList());
  const getCustomer = (id: string) => {
    const customer = customers.find(customer => customer.id === id);
    if (customer) setCustomer(customer);
    else throw Error("INVALID CUSTOMER");
  };

  useEffect(() => void getCustomerList(), [])

  if (customer === null) return (
    <div className="customer-list"> HELLO THER
      {customers && customers.map(customer => {
        return (
          <div key={customer.id} onClick={() => getCustomer(customer.id!)}>
            {`${customer.firstName} ${customer.lastName}`}
          </div>
        )
      })}
    </div>
  );

  const customerProps: CustomerProps = {
    customer: customer,
    setCustomer: setCustomer
  };

  return (<Customer { ...customerProps }/>);
};