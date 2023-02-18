import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { InspectionForm } from "./inspection-form";
import { Category, Customer, InspectionType, Report } from "./types";
import { flatten, unflatten } from "./utils/front-end/utils";
import {jsPDF } from "jspdf";


export interface P_InspectionReport {
  report: Report,
  setReport: Dispatch<SetStateAction<Report | null>>,
  setAddingReport: Dispatch<SetStateAction<boolean>>
};

export const InspectionReport: FC<P_InspectionReport> = ({ report, setReport, setAddingReport }): JSX.Element => {
  const flattenedState = flatten(report.form.categories);
  const [ state, setState ] = useState(flattenedState);
  const [ RVInfo, setRVInfo ] = useState(report.RVInfo);

  const saveForm = async () => {
    report.form.categories = unflatten(state) as Category[];
    report.RVInfo = RVInfo;
    await window.electronAPI.saveReport(report);
    setAddingReport(false);
    setReport(null);
  };

  const saveAsPDF = async () => {
    const report = document.querySelector(".printable-form")!as HTMLElement;

    const header = report.querySelector(".report-header")! as HTMLElement; // everythng except the form
    const table = report.querySelector("table")! as HTMLElement;
    const tableRows = table.querySelectorAll("tr");

    const jspdf = new jsPDF({
      unit: "px",
      format: "letter",
      hotfixes: ["px_scaling"]
    });

    const margin = 16;
    const pageHeight = jspdf.internal.pageSize.getHeight() - (margin * 2);

    let pdf: jsPDF = jspdf;
    
    let page: HTMLElement = document.createElement("div");
    let newTable: HTMLElement = document.createElement("table");
    let tbody = document.createElement("tbody");

    page.appendChild(header.cloneNode(true));

    let currentHeight = header.offsetHeight;
    let numberOfPages = 0;

    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const height = row.offsetHeight;
      
      if (i === tableRows.length - 1) {
        tbody.appendChild(row.cloneNode(true));
      };

      if (pageHeight < currentHeight + height || i === tableRows.length - 1) {
        newTable.appendChild(tbody);
        page.appendChild(newTable);

        await pdf.html(page, {
          callback: (doc: jsPDF) => {
            pdf = doc;
          },
          y: pageHeight * numberOfPages,
          margin: [margin, margin, margin, margin],
          width: 800 - margin,
          windowWidth: 800
        });

        currentHeight = height;
        numberOfPages++;

        page = document.createElement("div");
        newTable = document.createElement("table");
        tbody = document.createElement("tbody");

        tbody.appendChild(row.cloneNode(true));
      }
      else {
        tbody.appendChild(row.cloneNode(true));
        currentHeight+= height;
      };
    };

    pdf.save("multi-page.pdf");
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