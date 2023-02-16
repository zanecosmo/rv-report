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

export enum InspectionType {
  TOWABLE = "towable",
  MOTORHOME = "motorhome"
};

export interface Form {
  type: InspectionType,
  categories: Category[]
};

export interface Customer {
  id: null | string,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string
};

export interface Report {
  id: string | null,
  RVInfo: string,
  customer: Customer | null,
  dateCreated: Date | null,
  form: Form
};

export type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export interface IElectronAPI {
  getTableRow: (type: string) => Form,
  getCustomerList: () => Customer[],
  saveCustomerInfo: (customer: Customer) => void,
  deleteCustomer: (id: string) => void,
  generateReport: (customer: Customer | null, type: InspectionType) => Promise<Report>,
  getReportList: (id: string) => Promise<Report[]>,
  saveReport: (report: Report) => void,
  deleteReport: (id: string) => void
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};