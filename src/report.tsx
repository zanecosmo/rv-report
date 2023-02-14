import React, { FC, useState } from "react";
import { Report } from "./types";

interface ReportFormProps {
  report: Report,
  isTemplate: boolean
};

export const ReportForm: FC<ReportFormProps> = ({ report, isTemplate }): JSX.Element => {
  const [ formState, setFormState ] = useState(report.form);

  return (
    <div>
      {!isTemplate && (
        <>
         <div>{report.customer.firstName}</div> 
         <div>{report.customer.lastName}</div> 
         <div>{report.customer.address}</div> 
         <div>{report.customer.phone}</div> 
         <div>{report.customer.email}</div> 
        </>
      )}
      <h3>{report.type}</h3>
      {`${formState}`}
    </div>
  )
};