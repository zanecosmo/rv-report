import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { CustomerInfo } from "./types";

export interface CustomerProps {
  customer: CustomerInfo,
  setCustomer: Dispatch<SetStateAction<CustomerInfo | null>>
};

interface FormState extends Record<string, string> {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string
};

const generateCustomerInitialState = (customer: CustomerInfo | null): FormState => {
  return customer === null
    ? {
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: ""
      }
    : {
        id: customer.id!,
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        phone: customer.phone,
        email: customer.email
      }
};

export const Customer: FC<CustomerProps> = ({ customer, setCustomer }): JSX.Element => {
  console.log(customer);
  const [ isEditing, setIsEditing] = useState(false);
  const [ formState, setFormState ] = useState<FormState>(generateCustomerInitialState(customer));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  };

  return (
    <section>
        <button type="button" onClick={() => setIsEditing(true)}>Edit Customer</button>

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
          type="phone"
          name="address"
          value={ formState.phone }
          onChange={handleChange}
          readOnly={!isEditing}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="address"
          value={ formState.email }
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </section>
  )
};
