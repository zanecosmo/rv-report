import path from "path";
import { Customer, Form, Report } from "./types";
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from 'uuid';
import { database, extractForm } from "./utils/back-end/utils";


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js")
    }
  })

  mainWindow.webContents.openDevTools();

  ipcMain.handle("get-customer-list", async (_event: IpcMainInvokeEvent): Promise<Customer[]> => {
    return database.getCustomers();
  });

  ipcMain.handle("save-customer", async (_event: IpcMainInvokeEvent, customer: Customer): Promise<void> => {
    const customers: Customer[] = database.getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    if (index !== -1) customers[index] = customer;
    else {
      customer.id = uuidv4();
      customers.push(customer);
    };
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("delete-customer", async (_event: IpcMainInvokeEvent, id: string): Promise<void> => {
    const customers: Customer[] = database.getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) throw Error("CUSTOMER DOESN'T EXIST");
    else customers.splice(index, 1);
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("generate-report", async (_event: IpcMainInvokeEvent, customer, type): Promise<Report> => {
    const form: Form = database.getReportTemplate(type);
    const report: Report = {
      id: customer ? uuidv4() : null,
      customer: customer,
      dateCreated: customer ? new Date() : null,
      form: form
    };

    return report;
  });

  ipcMain.handle("save-report", async (_event: IpcMainInvokeEvent, report: Report): Promise<void> => {
    if (report.customer === null) {
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
    console.log("INDEX: " + index)
    if (index === -1) throw Error("REPORT DOESN'T EXIST");
    else reportList.splice(index, 1);
    database.saveReportList(reportList);
  });

  ipcMain.handle("get-report-list", async (_event: IpcMainInvokeEvent, id: string) => {
    return database.getReportList().filter(report => report.customer!.id === id);
  });

  mainWindow.loadFile('../public/index.html')
};

app.on("ready", () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});