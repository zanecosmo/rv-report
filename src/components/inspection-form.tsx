import React, { Dispatch, FC, SetStateAction } from "react";
import { Form } from "../types";
import { ContentEditableDiv } from "./content-editable-div";
import { CheckBox } from "./checkbox";
import { XButton } from "./x-button";
import { AddButton } from "./add-button";
import { MinusButton } from "./minus-button";

export interface P_InspectionForm {
  state: Form,
  setState: Dispatch<SetStateAction<Form>>,
  isTemplate: boolean,
  editable: boolean,
};

export const InspectionForm: FC<P_InspectionForm> = (props): JSX.Element => {
  const { state, setState, isTemplate, editable } = props;

  const addCategory = (categoryIndex: number) => {
    const newCategories = state.categories.map(c => c);

    newCategories.splice(categoryIndex, 0, {
      categoryName: "New Category",
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
          <th>Pass</th>
          <th>Fail</th>
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
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
                <tr>
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
                <tr>
                  <td colSpan={ 4 }>
                    <AddButton onClick={ () => addCategory(categoryIndex) } text="New Category" />
                  </td>
                </tr>
                <tr>
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
                <tr>
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
              </>
            ) }
        
            { isTemplate && (
              <>
                <tr>
                  <td className="spacer" colSpan={ 4 }> </td>
                </tr>
                <tr>
                  <td className="spacer">
                    <XButton onClick={ () => deleteCategory(categoryIndex) } />
                  </td>
                </tr>
              </>
              ) }

            <tr>
              <th className="line-item-notes" colSpan={ 4 }>
                <ContentEditableDiv { ...{
                  state,
                  setState,
                  payload: [ categoryIndex, null, "categoryName" ],
                  isEditable: isTemplate
                } } />
              </th>
            </tr>
        
            { category.rows.map((_row, rowIndex) => (
              <tr key={ `row.${rowIndex}.key` }>
                <td className="line-item-notes">
                  <ContentEditableDiv { ...{
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
                    editable: isTemplate || editable
                  } } />
                </td>
            
                <td className="pass-fail">
                  <CheckBox { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "fail" ],
                    editable: isTemplate || editable
                  } } />
                </td>
            
                <td className="line-item-notes">
                  <ContentEditableDiv { ...{
                    state,
                    setState,
                    payload: [ categoryIndex, rowIndex, "notes" ],
                    isEditable: isTemplate || editable
                  } } />
                  { isTemplate && (
                    <MinusButton onClick={ () => deleteLineItem(categoryIndex, rowIndex) } />
                  ) }
                </td>
              </tr>
          )) }

          { isTemplate && (
            <tr>
              <td colSpan={ 4 }>
                <AddButton onClick={ () => addLineItem(categoryIndex) } text="Add Line Item" />
              </td>
            </tr>
          ) }
      
          <tr>
            <td className="line-item-notes" colSpan={ 4 }>
              <span>Notes:</span>
              <ContentEditableDiv { ...{
                state,
                setState,
                payload: [ categoryIndex, null, "notes" ],
                isEditable: isTemplate || editable
              }} />
            </td>
          </tr>
        </tbody>
        )
      }) }

    </table>
  );
};