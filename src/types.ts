export interface CustomerInfo {
  id: null | string,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string
};

export interface FormRow {
  lineItem: string,
  pass: boolean,
  fail: boolean,
  notes: string
};

export interface FormCategory {
  categoryName: string,
  formRows: FormRow[],
  notes: string
};

export interface Report {
  id: string,
  customerId: string,
  dateCreated: Date,
  form: FormCategory[]
};

export interface IElectronAPI {
  getTableRow: (type: string) => FormCategory[],
  getCustomerList: () => CustomerInfo[],
  saveCustomerInfo: (customer: CustomerInfo) => void,
  deleteCustomer: (customer: CustomerInfo) => void
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};

window.electronAPI = window.electronAPI;