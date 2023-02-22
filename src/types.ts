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

///////////////////////////

export interface RowTEST extends Record<string, string | boolean> {
  lineItem: string,
  pass: boolean,
  fail: boolean,
  notes: string
};

export interface CategoryTEST extends Record<string, string | RowTEST[]> {
  categoryName: string,
  rows: RowTEST[],
  notes: string
};

export interface FormTEST {
  type: InspectionType,
  categories: CategoryTEST[]
};

export interface ReportTEST {
  id: string | null,
  RVInfo: string,
  customer: Customer | null,
  dateCreated: string | null,
  form: FormTEST
};

///////////////////////////

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
  getCustomerList: () => Customer[],
  saveCustomerInfo: (customer: Customer) => Promise<string | undefined>,
  deleteCustomer: (id: string) => void,
  generateReport: (customer: Customer | null, type: InspectionType) => Promise<ReportTEST>,
  getReportList: (id: string) => Promise<ReportTEST[]>,
  saveReport: (report: ReportTEST) => void,
  deleteReport: (id: string) => void
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};