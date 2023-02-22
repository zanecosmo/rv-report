import React, { FC, useEffect, useState } from "react";
import { CustomerView } from "./customer";
import { Customer } from "../types";
import { ChooseInspectionType } from "./choose-inspection-type";
import { AddButton } from "../components/add-button";
import { EditButton } from "../components/edit-button";

export const App: FC = (): JSX.Element => {
  const [ customers, setCustomers ] = useState<Customer[]>([]);
  const [ customer, setCustomer ] = useState<Customer | null>(null);
  const [ editingReport, setEditingReport ] = useState(false);

  const getCustomerList = async () => {
    const list = await window.electronAPI.getCustomerList();
    setCustomers(list);
  };

  const getCustomer = async (id: string) => {
    const customer = customers.find(customer => customer.id === id);
    if (customer) setCustomer(customer);
    else throw Error("INVALID CUSTOMER");
  };

  const editTemplate = () => {
    setEditingReport(true);
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

  useEffect(() => void getCustomerList(), [customer]);

  if (editingReport) return (
    <ChooseInspectionType { ...{ customer: null, setEditingReport } } />
  )

  if (customer === null) return (
    <>
      <div className="toolbar">
        <EditButton onClick={ () => editTemplate() } text="Edit Template" />
        <AddButton onClick={ () => createNewCustomer() } text="Add Customer" />
      </div>
      
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