import path from "path";
import { Customer, Form, Report } from "./types";
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from 'uuid';
import { database, extractForm } from "./utils";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js")
    }
  })

  mainWindow.webContents.openDevTools();

  ipcMain.handle("generic-event", (_event: IpcMainInvokeEvent, type: string) => {
    return extractForm(database.grabLineItems(), type);
  });

  ipcMain.handle("get-customer-list", async (_event: IpcMainInvokeEvent): Promise<Customer[]> => {
    return database.grabCustomers();
  });

  ipcMain.handle("save-customer", async (_event: IpcMainInvokeEvent, customer: Customer): Promise<void> => {
    const customers: Customer[] = database.grabCustomers();
    const index = customers.findIndex(c => c.id === customer.id);
    if (index !== -1) customers[index] = customer;
    else {
      customer.id = uuidv4();
      customers.push(customer);
    };
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("delete-customer", async (_event: IpcMainInvokeEvent, id: string): Promise<void> => {
    const customers: Customer[] = database.grabCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) throw Error("CUSTOMER DOESN'T EXIST");
    else {
      customers.splice(index, 1);
    };
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("generate-report", async (_event: IpcMainInvokeEvent, { customer, type }): Promise<Report> => {
    const form: Form = database.getReportTemplate(type);
    const report: Report = {
      id: uuidv4(),
      type: type,
      customer: customer,
      dateCreated: new Date(),
      form: form
    };

    return report;
  })

  mainWindow.loadFile('../public/index.html')
};

app.on("ready", () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});