export type InputTypes = string | boolean | Date;
export const isInputType = (any: any): any is InputTypes =>  {
  return (typeof any === "string" || typeof any === "boolean" || any instanceof Date) ? true : false;
};

export interface FlattenedState {
  [key: string]: InputTypes
};

export interface NestedObject { [key: string]: any }

export interface Category {
  categoryName: string,
  rows: Row[],
  notes: string
};

export interface Row {
  lineItem: string,
  pass: boolean,
  fail: boolean,
  notes: string
};

export type Form = Category[];

export interface Customer {
  id: null | string,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string
};

export interface Report {
  id: string,
  type: string,
  customer: Customer,
  dateCreated: Date,
  form: Form
};

export interface IElectronAPI {
  getTableRow: (type: string) => Form,
  getCustomerList: () => Customer[],
  saveCustomerInfo: (customer: Customer) => void,
  deleteCustomer: (id: string) => void,
  generateReport: (customer: Customer, type: "towable" | "motorhome") => Promise<Report>
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};

window.electronAPI = window.electronAPI;