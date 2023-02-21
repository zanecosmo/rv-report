import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ChooseInspectionType } from "./choose-inspection-type";
// import { InspectionReport } from "./inspection-report";
import { Customer, Report, ReportTEST } from "../types";
import { InspectionReportTEST } from "./inspection-report-TEST";

export interface P_Customer {
  customer: Customer,
  setCustomer: Dispatch<SetStateAction<Customer | null>>
};

export const CustomerView: FC<P_Customer> = ({ customer, setCustomer }): JSX.Element => {
  const [ isEditing, setIsEditing ] = useState(customer.id === "" ? true : false);
  const [ addingReport, setAddingReport ] = useState(false);
  const [ reports, setReports ] = useState<ReportTEST[]>([]);
  const [ report, setReport ] = useState<ReportTEST | null>(null);

  const getReportList = async (id: string) => setReports(await window.electronAPI.getReportList(id));

  useEffect(() => {
    if (customer.id === "" || addingReport) return;
    getReportList(customer.id!);
  }, [addingReport, report]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  
  const saveCustomer = async () => {
    const id = await window.electronAPI.saveCustomerInfo(customer);
    if (id) setCustomer({ ...customer, id: id });
    setIsEditing(false);
  };

  const deleteCustomer = () => {
    window.electronAPI.deleteCustomer(customer.id!);
    setCustomer(null);
  };

  if (report) return <InspectionReportTEST { ...{ report, setReport, setAddingReport } } />
  else if (addingReport) return (<ChooseInspectionType  {...{ customer, setAddingReport } }  />)
  return (
    <>
      <section>
        { isEditing
          ? (<>
              <button type="button" onClick={ saveCustomer }>Save</button>
              <button type="button" onClick={ () => customer.id === "" ? setCustomer(null) : setIsEditing(false) }>Cancel</button>
            </>)
          : (<>
              <button type="button" onClick={ () => setIsEditing(true) }>Edit Customer</button>
              <button type="button" onClick={ () => setCustomer(null) }>Back</button>
              <button type="button" onClick={ deleteCustomer }>Delete Customer</button>

            </>) }

        <h3>Customer Info</h3>
        <hr />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={ customer.firstName }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={ customer.lastName }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={ customer.address }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={ customer.phone }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={ customer.email }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />
      </section>
      <section>
        { !isEditing && (
          <>
            <button type="button" onClick={ () => setAddingReport(true) }>Add Report</button>
            { reports.length === 0
              ? <div>NO REPORTS</div>
              : reports.map(report => {
                return (
                  <div className="report" key={ report.id }
                    onClick={ () => setReport(report) }
                  >
                    { `${ report.form.type } ${ report.dateCreated }` }
                  </div>
                )
              }) }
          </>
          ) }
      </section>
    </>
  );
};
