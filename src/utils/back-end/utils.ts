import { Category, Customer, Form, InspectionType, Report, Row } from "../../types";
import FS from "fs";

export const database = {
  getCustomers: (): Customer[] => JSON.parse(FS.readFileSync("./db/customer-info.json").toString()),
  saveCustomerInfo: (customers: Customer[]) => {
    FS.writeFileSync("./db/customer-info.json", JSON.stringify(customers));
  },
  getReportTemplate: (type: InspectionType): Form => {
    return JSON.parse(FS.readFileSync(`./db/templates/${type}-template.json`).toString());
  },
  saveReportTemplate: (form: Form) => {
    FS.writeFileSync(`./db/templates/${form.type}-template.json`, JSON.stringify(form));
  },
  getReportList: (): Report[] => JSON.parse(FS.readFileSync("./db/reports.json").toString()),
  saveReportList: (reports: Report[]) => FS.writeFileSync("./db/reports.json", JSON.stringify(reports))
};

export const extractForm = (items: string, formType: string) => {

  const categories: string[] = items.split("\r\n\r\n"); // entire category, including line-items and notes

  const categoriesArray: Category[] = [];
  
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