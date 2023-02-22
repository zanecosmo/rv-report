import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Customer, FormTEST, InspectionType, ReportTEST } from "../types";
import {jsPDF } from "jspdf";
import { InspectionFormTEST } from "../components/inspection-form-TEST";
import { NegateButton } from "../components/negate-button";
import { BackButton } from "../components/back-button";
import { SaveButton } from "../components/save-button";
import { SaveAsPDFButton } from "../components/save-as-pdf-button";
import { EditButton } from "../components/edit-button";

export interface P_InspectionReport {
  report: ReportTEST,
  setReport: Dispatch<SetStateAction<ReportTEST | null>>,
  setEditingReport: Dispatch<SetStateAction<boolean>>
};

export const InspectionReportTEST: FC<P_InspectionReport> = ({ report, setReport, setEditingReport }): JSX.Element => {
  const [ state, setState ] = useState<FormTEST>(report.form);
  const [ RVInfo, setRVInfo ] = useState(report.RVInfo);
  const [ isEditing, setIsEditing ] = useState(false);

  const saveForm = async () => {
    if (report.customer) {
      report.RVInfo = RVInfo;
      await window.electronAPI.saveReport(report);
      setIsEditing(false);
      // setReport(null);
    }
    else {
      console.log("SAVE TEMPLATE PRESSED");
      report.form = state;
      console.log(report.form.categories)
      await window.electronAPI.saveReport(report);
      setEditingReport(false);
      setReport(null);
    }
  };

  const saveAsPDF = async () => {
    const reportElement = document.querySelector(".printable-form")!as HTMLElement;

    const header = reportElement.querySelector(".report-header")! as HTMLElement; // everythng except the form
    const table = reportElement.querySelector("table")! as HTMLElement;
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

    const filename = `${report.dateCreated} ${report.customer?.firstName} ${report.customer?.lastName}`

    pdf.save(`${filename}.pdf`);
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
      <hr></hr>
      <h3>Customer Info</h3>

      <div>{ `${customer.firstName}${customer.lastName ? ` ${customer.lastName}` : ""}` }</div>
      {customer.phone !== "" && <div>{ customer.phone }</div>}
      {customer.email !== "" && <div>{ customer.email }</div>}
      {customer.address !== "" && <div>{ customer.address }</div>}

    </section>
  );
  
    console.log(isEditing);

  return (
    <div>

      <div className="toolbar">
        { !report.customer
          ? (<>
              <NegateButton onClick={ () => setEditingReport(false) } text="Cancel" />
              <SaveButton onClick={ () => saveForm() } />
            </>)
          : (<>
              { isEditing
                ? (
                    <>
                      <SaveButton onClick={ () => saveForm() } />
                      <NegateButton onClick={ () => setIsEditing(false) } text="Cancel" />
                    </>
                  ) 
                : (
                    <>
                      <BackButton onClick={ () => setReport(null) } />
                      <EditButton onClick={ () => setIsEditing(true) } text="Edit Report" />
                      <SaveAsPDFButton onClick={ () => saveAsPDF() } />
                      <NegateButton onClick={ () => deleteReport() } text="Delete" />
                    </>      
                  )
              }
            </>)
        }
      </div>

      <div className="printable-form">

        <div className="report-header">

          { report.customer
            ? (<>
                <h1>On The Spot Mobile RV and Trailer Service</h1>
                <h3>{ reportTitle }</h3>

                { createCustomerInfoSection(report.customer) }

                <section>
                  <hr></hr>
                  <h3>Rv Info</h3>
                    <input className="rv-info"
                    type="text"
                    value={ RVInfo }
                    onChange={ (e: ChangeEvent<HTMLInputElement>) => setRVInfo(e.target.value) }
                  />
                </section>
              </>)
            : (<>{ reportTitle }</>)
          }

          <hr></hr>
          <h3>Report</h3>

        </div>

        <InspectionFormTEST { ...{ state, setState, isTemplate: !report.customer, editable: isEditing } } />

      </div>

    </div>
  );
};