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
    ? path.join(dbPath, `${type}-template`)
    : path.join(dbPath, `${type}-template`);
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
    if (FS.existsSync(getTemplatePath(type))) {
      return JSON.parse(FS.readFileSync(getTemplatePath(type), "utf-8"));
    } else {
      const templatePath = path.join(__dirname, `../../../db/templates/${type}-template.json`);
      return JSON.parse(FS.readFileSync(templatePath, "utf-8"));
    }
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