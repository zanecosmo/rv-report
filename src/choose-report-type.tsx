import React, { FC, useState } from "react";
import { ReportForm } from "./report";
import { Customer, Report } from "./types";

export const ChooseReportTypeView: FC<Customer> = (customer): JSX.Element => {
  const [ report, setReport ] = useState<Report | null>(null);

  if (report) return <ReportForm report={report} isTemplate={false} />;

  const getReport = async (type: "towable" | "motorhome") => {
    const report = await window.electronAPI.generateReport(customer, type);
    setReport(report);
  }

  return (
    <>
      <h3>Choose Type:</h3>
      <button type="button" onClick={() => getReport("towable")}>Towable</button>
      <button type="button" onClick={() => getReport("motorhome")}>Motorhome</button>
    </>
  );
};