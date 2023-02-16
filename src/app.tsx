import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { CustomerView } from "./customer";
import { Customer, Category } from "./types";

// get customer id
// go into report file
// parse report file
// get the reports that are associated with the customer

// get report
// let rowNumber = 0
// for each category in report
// for each row in category
// create JSX.Element <tr> with <td> inluding everything in the row:
// str of lineitem (readonly)
// checkbox of pass > input a name of rowNuber
// checkbox of fail > input a name of rowNuber
// editable notes > input a name of rowNuber
// give the <tr> and each



const buildReport = (report: Category[]) => {
  let rowNumber = 0;
  return (
    <table>

      <thead>
        <tr>
          <th>List Item</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {report.map(category => (
          <>
            <tr>
              <td className="spacer" colSpan={4}> </td>
            </tr>

            <tr>
              <th colSpan={4}>${category.categoryName}</th>
            </tr>

            {category.rows.map(row => {
              console.log()

              const newRow = (
                <tr key={ rowNumber.toString() }>
                  <td>{row.lineItem}</td>
                  <td className="pass-fail">
                    <label className="checkbox">
                      <input name={ rowNumber.toString() } type="checkbox" checked={row.pass ? true : undefined} />
                      <span className="overlay">
                        <div className="icon-container">
                          <div className="icon"></div>
                        </div>
                      </span>
                    </label>
                  </td>
                  <td className="pass-fail">
                    <label className="checkbox">
                      <input type="checkbox" checked={row.fail ? true : undefined} />
                      <span className="overlay">
                        <div className="icon-container">
                          <div className="icon"></div>
                        </div>
                      </span>
                    </label>
                  </td>
                  <td className="line-item-notes">
                    <div className="textarea-div" contentEditable="true">{row.notes}</div>
                  </td>
                </tr>
              );

              rowNumber++;
              return newRow;
            })}
          </>
        ))}
      </tbody>

    </table>
  );
};

// retrieved DTO from the db
// convert to DTO useable state
// update state with react
// reconvert state into DTO
// send DTO in db

interface ReportFormState {
  [ key: string ]: {
    rows: FormRowTEST[],
    notes: string
  }
};

interface FormRowTEST extends Record<string, string | boolean> {
  lineItem: string,
  pass: boolean,
  fail: boolean,
  notes: string,
};

const addCategory = (state: ReportFormState, category: string) => { // EDIT report template
  const newState = state;
  newState[category] = {
    rows: [],
    notes: ""
  };
  state = newState;
};





// const editCategory = (state: ReportFormState, category: string) => { // EDIT report template
//   const currentCategory = state[category];



//   newState[category] = {
//     rows: [],
//     notes: ""
//   };
//   state = newState;
// };

const removeCategory = (state: ReportFormState, category: string) => { // EDIT report template
  const newState = state;
  delete newState[category];
  state = newState;
}

const addRowToCategory = (state: ReportFormState, category: string) => { // EDIT report template
  const rows: FormRowTEST[] = state[category].rows;
  rows.push({
    lineItem: "",
    pass: false,
    fail: false,
    notes: ""
  });
  state = {
    ...state,
    [category]: {
      ...state[category],
      rows: rows
    }
  };
};

const removeRowFromCategory = (state: ReportFormState, category: string, index: number) => { // EDIT report template
  const rows = state[category].rows;
  rows.splice(index, 1);
  state = {
    ...state,
    [category]: {
      ...state[category],
      rows: rows
    }
  };
};



const setState = (state: ReportState, newItem: any) => {
  const name = "electrical.1";
  const [ category, index, input ] = name.split(".");
  state = {
    ...state,
    form: {
      ...state.form,
      [category]: {
        ...state.form[category],
        [index]: newItem
      }
    }
  };
};

interface ReportState { // state for component
  id: string,
  customerId: string,
  date: Date,
  form: ReportFormState
};

const defaultReportState: ReportFormState = { // generated from the form-template-report DTO
  ["electrical"]: {
    rows: [
      {
        lineItem: "",
        pass: false,
        fail: false,
        notes: ""
      },
      {
        lineItem: "",
        pass: false,
        fail: false,
        notes: ""
      }
    ],
    notes: ""
  },
  ["hvac"]: {
    rows: [
      {
        lineItem: "",
        pass: false,
        fail: false,
        notes: ""
      }
    ],
    notes: ""
  }
};

interface ReportProps {
  report: ReportState,
  isTemplate: boolean
};

const ReportForm: FC<ReportProps> = ({ report, isTemplate }): JSX.Element => {
  const [ isEditing, setIsEditing] = useState(report.id === "" ? true : false);
  const [ reportState, setReportState ] = useState(report); // convert report objet (DTO) into reportState

  // default values (empty)
  // retrieved (~filled out)

  // reportFormState: ReportFormState

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const [ category, index, input ] = name.split(".");
    
    const i = parseInt(index);

    const rows = reportState.form[category].rows[i];
    rows[input] = e.target.value;

    setReportState({
      ...reportState,
      form: {
        ...reportState.form,
        [category]: {
          ...reportState.form[category],
          rows: [ rows ]
        }
      }
    });
  };

  const createForm = () => {
    const formHead = (
      <thead>
          <tr>
            <th>List Item</th>
            <th>Passed</th>
            <th>Failed</th>
            <th>Notes</th>
          </tr>
        </thead>
    );
    
    const formBody: JSX.Element[] = [];
    
    let category: keyof ReportFormState;
    
    for (category in reportState.form) {
      const { rows, notes } = reportState.form[category];
  
      formBody.push(
        <>
          <tr>
            <td className="spacer" colSpan={ 4 }> </td>
          </tr>
  
          <tr>
            <th colSpan={ 4 }>
              <input
                type="text"
                name="category"
                value={ category }
              />
            </th>
          </tr>
  
          {rows.map((row, index) => {
  
            const key = `${category}.${index}`;
  
            return (
              <tr key={ key }>

                <td>
                  <input
                    type="text"
                    name={ `${key}.lineItem` }
                    value={ row.lineItem }
                    onChange={ handleInputChange }
                  />
                </td>

                <td className="pass-fail">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name={ `${key}.pass` }
                      checked={ row.pass }
                      onChange={ handleInputChange }
                    />
                    <span className="overlay">
                      <div className="icon-container"><div className="icon"></div></div>
                    </span>
                  </label>
                </td>

                <td className="pass-fail">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name={ `${key}.fail` }
                      checked={ row.fail }
                      onChange={ handleInputChange }
                    />
                    <span className="overlay">
                      <div className="icon-container">
                        <div className="icon"></div>
                      </div>
                    </span>
                  </label>
                </td>

                <td className="line-item-notes">
                  {/* <div className="textarea-div" contentEditable="true">{row.notes}</div> */}
                  <input
                    type="text"
                    name={ `${key}.notes` }
                    value={ row.notes }
                    onChange={ handleInputChange }
                  />
                </td>

              </tr>
            );
          })}

          <tr>
            <th colSpan={4}>{category}</th>
          </tr>
        </>
      )
    }
  }



  return (
    <></>
  );
};

export const App: FC = (): JSX.Element => {
  const [ customers, setCustomers ] = useState<Customer[]>([]);
  const [ customer, setCustomer ] = useState<Customer | null>(null);

  const getCustomerList = async () => setCustomers(await window.electronAPI.getCustomerList());

  const getCustomer = async (id: string) => {
    const customer = customers.find(customer => customer.id === id);
    // await window.electronAPI.getReportList(id);
    if (customer) setCustomer(customer);
    else throw Error("INVALID CUSTOMER");
  };

  const createNewCustomer = () => {
    setCustomer({
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: ""
    });
  };

  useEffect(() => void getCustomerList(), [customer])

  if (customer === null) return (
    <>
      <button type="button" onClick={() => createNewCustomer()}>Add Customer</button>
      <div className="customer-list">
        {customers && customers.map((customer: Customer) => {
          return (
            <div key={customer.id} onClick={() => getCustomer(customer.id!)}>
              {`${customer.firstName} ${customer.lastName}`}
            </div>
          )
        })}
      </div>
    </>
  );

  return (<CustomerView customer={customer} setCustomer={setCustomer} />);
};