import { Category, Customer, Form, FormTEST, InspectionType, Report, ReportTEST, Row } from "../../types";
import { app } from "electron";
import path from "path";
import FS from "fs";

export const isDev = () => {
  // console.log(require.main ? require.main.filename : "NO MAIN");
  return require.main?.filename.indexOf("app.asar") === -1;
};

const dbPath = path.join(app.getPath("userData"), "json-database");

if (!FS.existsSync(dbPath)) {
  FS.mkdir(dbPath, { recursive: true }, (error: NodeJS.ErrnoException | null): void => {
      if (error && error.code === "ENOENT") return;
      else throw error;
    }
  );
};

const customerInfoPath = path.join(dbPath, "customer-info.json");
const reportsListPath = path.join(dbPath, "reports.json");

const isError = (error: any): error is NodeJS.ErrnoException => {
  return error instanceof Error;
};

const getTemplatePath = (type: string) => {
  return isDev()
    ? `./db/templates/${type}-template.json`
    : `../../db/templates/${type}-template.json`
};

export const database = {
  getCustomers: (): Customer[] => {
    try {
      return JSON.parse(FS.readFileSync(customerInfoPath, "utf-8"));
    }
    catch (error: unknown) {
      if (isError(error) && error.code === "ENOENT") return [];
      else throw error;
    };
  },
  saveCustomerInfo: (customers: Customer[]) => {
    FS.writeFileSync(customerInfoPath, JSON.stringify(customers));
  },
  getReportTemplate: (type: InspectionType): FormTEST => {
    return JSON.parse(FS.readFileSync(getTemplatePath(type)).toString());
  },
  // this is not used yet
  saveReportTemplate: (form: FormTEST) => {
    FS.writeFileSync(getTemplatePath(form.type), JSON.stringify(form));
  },
  getReportList: (): ReportTEST[] => {
    try {
      return JSON.parse(FS.readFileSync(reportsListPath, "utf-8"));
    }
    catch (error: unknown) {
      if (isError(error) && error.code === "ENOENT") return [];
      else throw error;
    };
  },
  saveReportList: (reports: ReportTEST[]) => FS.writeFileSync(reportsListPath, JSON.stringify(reports))
};