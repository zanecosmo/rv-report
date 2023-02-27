import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { NegateButton } from "../components/negate-button";
// import { InspectionReport } from "./inspection-report";
import { Customer, InspectionType, Report } from "../types";
import { InspectionReport } from "./inspection-report";

interface P_ChooseInspectionType {
  customer: Customer | null,
  setEditingReport: Dispatch<SetStateAction<boolean>>
};

export const ChooseInspectionType: FC<P_ChooseInspectionType> = ({ customer, setEditingReport }): JSX.Element => {
  const [ report, setReport ] = useState<Report | null>(null);

  const getInspection = async (type: InspectionType) => {
    const report: Report = await window.electronAPI.generateReport(customer, type);
    setReport(report);
  };

  if (report) return <InspectionReport { ...{ report, setReport, setEditingReport } }  />;

  return (
    <>
      <div className="toolbar">
        <NegateButton onClick={ () => setEditingReport(false) } text="Cancel" />
      </div>

      <h3>Choose Type:</h3>
      <button type="button" onClick={ () => getInspection(InspectionType.TOWABLE) }>Towable</button>
      <button type="button" onClick={ () => getInspection(InspectionType.MOTORHOME) }>Motorhome</button>
    </>
  );
};