import path from "path";
import { Customer, Form, FormTEST, Report, ReportTEST } from "../types";
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from 'uuid';
import { database, isDev } from "../utils/back-end/utils";

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

const createWindow = () => {
  const preloadPath = isDev()
    ? path.resolve(__dirname, "./preload.js")
    : path.resolve(__dirname, "./preload.js");

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: preloadPath
    }
  });

  mainWindow.removeMenu();

  isDev() && mainWindow.webContents.openDevTools();

  ipcMain.handle("get-customer-list", async (_event: IpcMainInvokeEvent): Promise<Customer[]> => {
    return database.getCustomers();
  });

  ipcMain.handle("save-customer", async (_event: IpcMainInvokeEvent, customer: Customer): Promise<string | undefined> => {
    const customers: Customer[] = database.getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    let id: string = "";
    if (index !== -1) customers[index] = customer;
    else {
      id = uuidv4()
      customer.id = id;
      customers.push(customer);
    };
    database.saveCustomerInfo(customers);
    return id;
  });

  ipcMain.handle("delete-customer", async (_event: IpcMainInvokeEvent, id: string): Promise<void> => {
    const customers: Customer[] = database.getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) throw Error("CUSTOMER DOESN'T EXIST");
    else customers.splice(index, 1);
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("generate-report", async (_event: IpcMainInvokeEvent, customer, type): Promise<ReportTEST> => {
    const form: FormTEST = database.getReportTemplate(type);
    const report: ReportTEST = {
      id: customer ? uuidv4() : null,
      customer: customer,
      RVInfo: "",
      dateCreated: customer ? getCurrentDate() : null,
      form: form
    };

    return report;
  });

  ipcMain.handle("save-report", async (_event: IpcMainInvokeEvent, report: ReportTEST): Promise<void> => {
    if (report.customer === null) {
      console.log("NO CUSTOMER");
      console.log(report.form);
      database.saveReportTemplate(report.form);
      return;
    };
    
    const reportList = database.getReportList();
    const index = reportList.findIndex(r => r.id === report.id);
    if (index !== -1) reportList[index] = report;
    else reportList.push(report);

    database.saveReportList(reportList);
  });

  ipcMain.handle("delete-report", async (_event: IpcMainInvokeEvent, id: string) => {
    const reportList = database.getReportList();
    const index = reportList.findIndex(r => r.id === id);
    if (index === -1) throw Error("REPORT DOESN'T EXIST");
    else reportList.splice(index, 1);
    database.saveReportList(reportList);
  });

  ipcMain.handle("get-report-list", async (_event: IpcMainInvokeEvent, id: string) => {
    return database.getReportList().filter(report => report.customer!.id === id);
  });

  const HTMLPath = isDev()
    ? path.resolve(__dirname, "../../public/index.html")
    : path.resolve(__dirname, "../../public/index.html");
  mainWindow.loadFile(HTMLPath);
};

app.on("ready", () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});