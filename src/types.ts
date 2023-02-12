export interface CustomerInfo {
  name: string,
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
  customerId: number,
  dateCreated: Date,
  categories: FormCategory[]
}

export interface IElectronAPI {
  getTableRow: (type: string) => FormCategory[]
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};

window.electronAPI = window.electronAPI;