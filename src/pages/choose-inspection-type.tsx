import React, { Dispatch, FC, SetStateAction, useState } from "react";
// import { InspectionReport } from "./inspection-report";
import { Customer, InspectionType, Report, ReportTEST } from "../types";
import { InspectionReportTEST } from "./inspection-report-TEST";

interface P_ChooseInspectionType {
  customer: Customer | null,
  setAddingReport: Dispatch<SetStateAction<boolean>>
};

export const ChooseInspectionType: FC<P_ChooseInspectionType> = ({ customer, setAddingReport }): JSX.Element => {
  const [ report, setReport ] = useState<ReportTEST | null>(null);

  const getInspection = async (type: InspectionType) => {
    const report: ReportTEST = await window.electronAPI.generateReport(customer, type);
    setReport(report);
  };

  if (report) return <InspectionReportTEST { ...{ report, setReport, setAddingReport } }  />;

  return (
    <>
      <button type="button" onClick={ () => setAddingReport(false) }>Cancel</button>

      <h3>Choose Type:</h3>
      <button type="button" onClick={ () => getInspection(InspectionType.TOWABLE) }>Towable</button>
      <button type="button" onClick={ () => getInspection(InspectionType.MOTORHOME) }>Motorhome</button>
    </>
  );
};