import React, { FC, useEffect, useState } from "react";
import { CustomerInfo } from "./types";

export const App: FC = (): JSX.Element => {
  const [ customers, setCustomers ] = useState<CustomerInfo[]>([]);

  const getCustomerList = async () => setCustomers(await window.electronAPI.getCustomerList());

  useEffect(() => void getCustomerList(), [])

  return (
    <div className="customer-list"> HELLO THER
      {customers && customers.map(customer => {
        console.log(customer.id)
        return <div key={customer.id}>{`${customer.firstName} ${customer.lastName}`}</div>
      })}
    </div>
  );
};