import { Customer, Form, Row } from "./types";
import FS from "fs";

export const database = {
  grabLineItems: () => FS.readFileSync("./db/line-items.txt").toString(),
  grabCustomers: (): Customer[] => JSON.parse(FS.readFileSync("./db/customer-info.json").toString()),
  saveCustomerInfo: (customers: Customer[]) => {
    FS.writeFileSync("./db/customer-info.json", JSON.stringify(customers));
  },
  getReportTemplate: (type: "towable" | "motorhome"): Form => {
    return JSON.parse(FS.readFileSync(`./db/templates/${type}-template.json`).toString())
  }
};

export const extractForm = (items: string, formType: string) => {

  const categories: string[] = items.split("\r\n\r\n"); // entire category, including line-items and notes

  const categoriesArray: Form = [];
  
  for (let i = 0; i < categories.length; i++) {

    const cat = categories[i];

    if (categories[i].split(" ")[0] === "**" && formType !== "motorhome") continue;

    const lineItems = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes

    if (lineItems.length === 0) continue;

    const category = lineItems.shift()!; // title

    const rows: Row[] = [];

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
      rows: rows,
      notes: ""
    });
  };

  return categoriesArray;
};