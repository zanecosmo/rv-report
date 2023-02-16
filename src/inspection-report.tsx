import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { InspectionForm, P_InspectionForm } from "./inspection-form";
import { Category, FlattenedState, Form, ReactState, Report } from "./types";
import { flatten, unflatten } from "./utils/front-end/utils";

export interface P_InspectionReport {
  report: Report,
  setReport: Dispatch<SetStateAction<Report | null>>,
  setAddingReport: Dispatch<SetStateAction<boolean>>
};

export const InspectionReport: FC<P_InspectionReport> = ({ report, setReport, setAddingReport }): JSX.Element => {
  const [ state, setState ] = useState(flatten(report.form.categories));

  const saveForm = async () => {
    report.form.categories = unflatten(state) as Category[];
    await window.electronAPI.saveReport(report);
    setAddingReport(false);
    setReport(null);
  };
  
  const deleteReport = async () => {
    await window.electronAPI.deleteReport(report.id!);
    setReport(null);
  };

  return (
    <div>

      <button type="button" onClick={ () => setReport(null) }>Back</button>
      <button type="button" onClick={ () => saveForm() }>Save</button>
      {report.customer && <button type="button" onClick={ () => deleteReport() }>Delete</button>}

      {report.customer && (
        <section>
          <div>{report.customer.firstName}</div> 
          <div>{report.customer.lastName}</div> 
          <div>{report.customer.address}</div> 
          <div>{report.customer.phone}</div> 
          <div>{report.customer.email}</div>
        </section>
      )}

      <h3>TYPE: {report.form.type}</h3>
      <InspectionForm state={ state } setState={ setState } />

    </div>
  );
};