import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { CustomerInfo } from "./types";

export interface CustomerProps {
  customer: CustomerInfo,
  setCustomer: Dispatch<SetStateAction<CustomerInfo | null>>
};

interface CustomerFormState extends Record<string, string> {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string
};

export const Customer: FC<CustomerProps> = ({ customer, setCustomer }): JSX.Element => {
  const [ isEditing, setIsEditing] = useState(customer.id === "" ? true : false);
  const [ formState, setFormState ] = useState<CustomerFormState>(customer as CustomerFormState);

  console.log(formState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const saveCustomer = () => {
    window.electronAPI.saveCustomerInfo(formState);
    setIsEditing(false);
  };

  const deleteCustomer = () => {
    window.electronAPI.deleteCustomer(customer);
    setCustomer(null);
  }

  return (
    <section>
      {isEditing
        ? (<>
            <button type="button" onClick={saveCustomer}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </>)
        : (<>
            <button type="button" onClick={() => setIsEditing(true)}>Edit Customer</button>
            <button type="button" onClick={() => setCustomer(null)}>Back</button>
            <button type="button" onClick={deleteCustomer}>Delete Customer</button>

          </>)}

        <h3>Customer Info</h3>
        <hr />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={ formState.firstName }
          onChange={handleChange}
          readOnly={!isEditing}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={ formState.lastName }
          onChange={handleChange}
          readOnly={!isEditing}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={ formState.address }
          onChange={handleChange}
          readOnly={!isEditing}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={ formState.phone }
          onChange={handleChange}
          readOnly={!isEditing}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={ formState.email }
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </section>
  )
};
