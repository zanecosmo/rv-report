import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { ContentEditableDiv } from "./content-editable-div";
import { Category, CategoryTEST, Form, FormTEST, RowTEST } from "../types";
import { ContentEditableDivTEST } from "./content-editable-div-TEST";
import { CheckBox } from "./checkbox";

export interface P_InspectionForm {
  state: FormTEST,
  setState: Dispatch<SetStateAction<FormTEST>>,
  isTemplate: boolean
};

export const InspectionFormTEST: FC<P_InspectionForm> = ({ state, setState, isTemplate }): JSX.Element => {
  const addCategory = () => {
    console.log("ADD CAEGORY PRESSED");
  };

  const buildTable = () => {

    console.log(state. categories);

    return state.categories.map((category, categoryIndex) => {
      console.log(category, categoryIndex)
      return (
        <tbody key={ `category.${categoryIndex.toString()}.key` }>

          <tr>
            <td className="spacer" colSpan={ 4 }> </td>
          </tr>

          { isTemplate && (
            <tr>
              <td colSpan={ 4 }><button type="button" onClick={ () => addCategory() }>NEW CATEGORY</button></td>
              <td className="spacer" colSpan={ 4 }> </td>
            </tr>
          ) }
      
          <tr>
            <th className="line-item-notes" colSpan={ 4 }>
              <ContentEditableDivTEST { ...{ state, setState, payload: [ categoryIndex, null, "categoryName" ] } } />
            </th>
          </tr>
      
          { category.rows.map((row, rowIndex) => (
            <tr key={ `row.${rowIndex}.key` }>
              <td className="line-item-notes">
                <ContentEditableDivTEST { ...{ state,  setState, payload: [ categoryIndex, rowIndex, "lineItem" ] } } />
              </td>
          
              <td className="pass-fail">
                <CheckBox { ...{ state,  setState, payload: [ categoryIndex, rowIndex, "pass" ] } } />
              </td>
          
              <td className="pass-fail">
                <CheckBox { ...{ state,  setState, payload: [ categoryIndex, rowIndex, "fail" ] } } />
              </td>
          
              <td className="line-item-notes">
                <ContentEditableDivTEST { ...{ state, setState, payload: [ categoryIndex, rowIndex, "notes" ] } } />
              </td>
            </tr>
          )) }
      
          <tr>
            <td className="line-item-notes" colSpan={ 4 }>
              <span>Notes:</span>
              <ContentEditableDivTEST { ...{ state, setState, payload: [ categoryIndex, null, "notes" ] }} />
            </td>
          </tr>
        </tbody>
      )
    })
  }

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

      { buildTable() }

    </table>
  );
};