import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { InspectionForm } from "./inspection-form";
import { InspectionReport } from "./inspection-report";
import { Customer, Form, InspectionType, ReactState, Report } from "./types";

interface P_ChooseInspectionType {
  customer: Customer | null,
  setAddingReport: Dispatch<SetStateAction<boolean>>
};

export const ChooseInspectionType: FC<P_ChooseInspectionType> = ({ customer, setAddingReport }): JSX.Element => {
  const [ report, setReport ] = useState<Report | null>(null);
  // const [ form, setForm ] = useState<Form | null>(null);

  const getInspection = async (type: InspectionType) => {
    const report: Report = await window.electronAPI.generateReport(customer, type);
    setReport(report);
  };

  if (report) return <InspectionReport report={ report } setReport={ setReport } setAddingReport={ setAddingReport } />;

  // if (form) return (<InspectionForm { ...{
  //   form: form,
  //   customer: customer ? customer : null
  // } } />);

  return (
    <>
      <button type="button" onClick={ () => setAddingReport(false) }>Cancel</button>

      <h3>Choose Type:</h3>
      <button type="button" onClick={ () => getInspection(InspectionType.TOWABLE) }>Towable</button>
      <button type="button" onClick={ () => getInspection(InspectionType.MOTORHOME) }>Motorhome</button>
    </>
  );
};