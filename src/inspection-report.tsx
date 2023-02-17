import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { InspectionForm } from "./inspection-form";
import { Category, Customer, InspectionType, Report } from "./types";
import { flatten, unflatten } from "./utils/front-end/utils";

import { jsPDF } from "jspdf";


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

  const saveAsPDF = () => {
    const doc = new jsPDF();

    const report = document.querySelector(".printable-form")! as HTMLElement;
    // const header = report.querySelector(".report-header")! as HTMLElement;
    // const table = report.querySelector("table")! as HTMLElement;

    // const pdfWidth = 850;
    // const pdfHeight = 1100;

    // const headerHeight: number = header.offsetHeight;
    // let  page: HTMLElement = document.createElement("div");
    // let tbody: HTMLElement = document.createElement("tbody");
    
    // let remainingHeight = pdfHeight - headerHeight;

    // const tableRows = table.querySelectorAll("tr");

    // tableRows.forEach(row => {
    //   if (remainingHeight < row.offsetHeight) {
    //     page.appendChild(tbody);
    //     doc.html(page, {
    //       margin: [8, 8, 8, 8],
    //       autoPaging: false,
    //       width: pdfWidth,
    //       windowWidth: 10000
    //     });
    //     doc.addPage();
    //     page = document.createElement("div");
    //     tbody = document.createElement("tbody");
    //     tbody.appendChild(row);
    //     remainingHeight = pdfHeight - row.offsetHeight;
    //   } else {
    //     tbody.append(row);
    //     remainingHeight -= row.offsetHeight;
    //   };
    // });

    doc.html(report, {
      callback: () => doc.save(),
      margin: [8, 8, 8, 8],
      autoPaging: true,
      width: 240,
      windowWidth: 1000
    });
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
      {report.customer && <button type="button" onClick={ () => saveAsPDF() }>Save as PDF</button>}

      <div className="printable-form">

        <div className="report-header">

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

          <h3>Report</h3>
          <hr></hr>

        </div>

        <InspectionForm { ...{ state, setState } } />

      </div>

    </div>
  );
};