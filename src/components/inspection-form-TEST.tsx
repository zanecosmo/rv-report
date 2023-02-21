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

  const addCategory = (categoryIndex: number) => {
    const newCategories = state.categories.map(c => c);

    newCategories.splice(categoryIndex, 0, {
      categoryName: "",
      rows: [],
      notes: ""
    });

    setState({ ...state, categories: newCategories });
  };

  const addLineItem = (categoryIndex: number) =>  {
    const newCategories = state.categories.map(c => c);

    newCategories[categoryIndex].rows.push({
      lineItem: "",
      pass: false,
      fail: false,
      notes: ""
    });

    setState({ ...state, categories: newCategories });
  };

  const deleteCategory = (categoryIndex: number) => {
    const newCategories = state.categories.filter((_c, i) => i !== categoryIndex);
    setState({ ...state, categories: newCategories });
  };

  const deleteLineItem = (categoryIndex: number, rowIndex: number) => {
    const newCategories = state.categories.map(c => c);
    newCategories[categoryIndex].rows = newCategories[categoryIndex].rows.filter((_r, i) => i !== rowIndex);
    setState({ ...state, categories: newCategories })
  };

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

      { state.categories.map((category, categoryIndex) => {
        return (
          <tbody key={ `category.${categoryIndex.toString()}.key` }>

            <tr>
              <td className="spacer" colSpan={ 4 }> </td>
            </tr>

            { isTemplate && (
              <>
                <tr>
                  <td colSpan={ 4 }>
                    <button
                      type="button"
                      onClick={ () => addCategory(categoryIndex) }
                    >
                      + NEW CATEGORY
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
              </>
            ) }
        
            <tr>
              <th className="line-item-notes" colSpan={ 4 }>
                <ContentEditableDivTEST { ...{
                  state,
                  setState,
                  payload: [ categoryIndex, null, "categoryName" ],
                  isEditable: isTemplate
                } } />
                { isTemplate && (
                  <button type="button" onClick={ () => deleteCategory(categoryIndex) }>- DELETE CATEGORY</button>
                ) }
              </th>
            </tr>
        
            { category.rows.map((_row, rowIndex) => (
              <tr key={ `row.${rowIndex}.key` }>
                <td className="line-item-notes">
                  <ContentEditableDivTEST { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "lineItem" ],
                    isEditable: isTemplate
                  } } />
                </td>
            
                <td className="pass-fail">
                  <CheckBox { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "pass" ],
                    isEditable: isTemplate
                  } } />
                </td>
            
                <td className="pass-fail">
                  <CheckBox { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "fail" ],
                    isEditable: isTemplate
                  } } />
                </td>
            
                <td className="line-item-notes">
                  <ContentEditableDivTEST { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "notes" ],
                    isEditable: true  
                  } } />
                  { isTemplate && (
                    <button
                      type="button"
                      onClick={ () => deleteLineItem(categoryIndex, rowIndex) }
                    >
                      - DELETE LINE-ITEM
                    </button>
                  ) }
                </td>
              </tr>
          )) }

          { isTemplate && (
            <tr>
              <td colSpan={ 4 }>
                <button
                  type="button"
                  onClick={ () => addLineItem(categoryIndex) }
                >
                  + NEW LINE-ITEM
                </button>
              </td>
            </tr>
          ) }
      
          <tr>
            <td className="line-item-notes" colSpan={ 4 }>
              <span>Notes:</span>
              <ContentEditableDivTEST { ...{
                state,
                setState,
                payload: [ categoryIndex, null, "notes" ],
                isEditable: true
              }} />
            </td>
          </tr>
        </tbody>
        )
      }) }

    </table>
  );
};