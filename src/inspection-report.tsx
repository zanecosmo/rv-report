import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { InspectionForm } from "./inspection-form";
import { Category, Customer, InspectionType, Report } from "./types";
import { flatten, unflatten } from "./utils/front-end/utils";

export interface P_InspectionReport {
  report: Report,
  setReport: Dispatch<SetStateAction<Report | null>>,
  setAddingReport: Dispatch<SetStateAction<boolean>>
};

export const InspectionReport: FC<P_InspectionReport> = ({ report, setReport, setAddingReport }): JSX.Element => {
  const [ state, setState ] = useState(flatten(report.form.categories));
  const [ RVInfo, setRVInfo ] = useState(report.RVInfo);

  const saveForm = async () => {
    report.form.categories = unflatten(state) as Category[];
    report.RVInfo = RVInfo;
    await window.electronAPI.saveReport(report);
    setAddingReport(false);
    setReport(null);
  };
  
  const deleteReport = async () => {
    await window.electronAPI.deleteReport(report.id!);
    setReport(null);
  };

  const reportTitle = report.form.type === InspectionType.MOTORHOME
    ? "Motorhome Inspection Report"
    : "Towable RV Inspection Report";

  const createCustomerInfoSection = (customer: Customer) => (
    <section>
      <h3>Customer Info</h3>
      <hr></hr>

      <div>{ `${customer.firstName}${customer.lastName ? ` ${customer.lastName}` : ""}` }</div>
      {customer.phone !== "" && <div>{ customer.phone }</div>}
      {customer.email !== "" && <div>{ customer.email }</div>}
      {customer.address !== "" && <div>{ customer.address }</div>}

    </section>
  );
  
  return (
    <div>

      <button type="button" onClick={ () => setReport(null) }>Back</button>
      <button type="button" onClick={ () => saveForm() }>Save</button>
      {report.customer && <button type="button" onClick={ () => deleteReport() }>Delete</button>}

      {report.customer && (
        <>
          <h1>On The Spot Mobile RV and Trailer Service</h1>
          <h3>{ reportTitle }</h3>

          { createCustomerInfoSection(report.customer) }

          <section>
            <h3>Rv Info</h3>
            <hr></hr>
            <input
              type="text"
              value={ RVInfo }
              onChange={ (e: ChangeEvent<HTMLInputElement>) => setRVInfo(e.target.value) }
            />
          </section>
        </>
      )}

      <section>
        <h3>Report</h3>
        <hr></hr>
        <InspectionForm { ...{ state, setState } } />
      </section>

    </div>
  );
};