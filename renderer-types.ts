export interface IElectronAPI {
  getTableRow: () => Promise<string>
};

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
};

window.electronAPI = window.electronAPI;