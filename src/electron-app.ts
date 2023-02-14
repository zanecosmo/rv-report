import path from "path";
import { FormCategory, FormRow } from "./types";
import FS from "fs";
import { CustomerInfo } from "./types";
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from 'uuid';

export const database = {
  grabLineItems: () => FS.readFileSync("./db/line-items.txt").toString(),
  grabCustomerInfo: (): CustomerInfo[] => JSON.parse(FS.readFileSync("./db/customer-info.json").toString()),
  saveCustomerInfo: (customers: CustomerInfo[]) => {
    FS.writeFileSync("./db/customer-info.json", JSON.stringify(customers));
  }
};

export const extractForm = (items: string, formType: string) => {

  const categories: string[] = items.split("\r\n\r\n"); // entire category, including line-items and notes

  const categoriesArray: FormCategory[] = [];
  
  for (let i = 0; i < categories.length; i++) {

    const cat = categories[i];

    if (categories[i].split(" ")[0] === "**" && formType !== "motorhome") continue;

    const lineItems = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes

    if (lineItems.length === 0) continue;

    const category = lineItems.shift()!; // title

    const rows: FormRow[] = [];

    for (let i = 0; i < lineItems.length; i++) { // line-items and notes

      if (lineItems[i].split(" ")[0] === "--") {
        let notes = rows[rows.length - 1].notes;
        rows[rows.length - 1].notes = notes ? notes += ` ${lineItems[i]}` : lineItems[i];
      }

      else {
        rows.push({
          lineItem: lineItems[i],
          pass: false,
          fail: false,
          notes: ""
        });
      };
    };

    categoriesArray.push({
      categoryName: category,
      formRows: rows,
      notes: ""
    });
  };

  return categoriesArray;
};

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

  ipcMain.handle("get-customer-list", async (_event: IpcMainInvokeEvent): Promise<CustomerInfo[]> => {
    return database.grabCustomerInfo();
  });

  ipcMain.handle("save-customer-info", async (_event: IpcMainInvokeEvent, customer: CustomerInfo): Promise<void> => {
    const customers: CustomerInfo[] = database.grabCustomerInfo();
    const index = customers.findIndex(c => c.id === customer.id);
    console.log(index);
    if (index !== -1) customers[index] = customer;
    else {
      customer.id = uuidv4();
      customers.push(customer);
      console.log(customer);
    };
    database.saveCustomerInfo(customers);
  });

  ipcMain.handle("delete-customer", async (_event: IpcMainInvokeEvent, customer: CustomerInfo): Promise<void> => {
    const customers: CustomerInfo[] = database.grabCustomerInfo();
    const index = customers.findIndex(c => c.id === customer.id);
    if (index === -1) throw Error("USTOMER DOESN'T EXIST");
    else {
      customers.splice(index, 1);
    };
    database.saveCustomerInfo(customers);
  })

  mainWindow.loadFile('../public/index.html')
};

app.on("ready", () => createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});