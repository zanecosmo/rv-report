import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { ContentEditableDiv } from "./content-editable-div";
import { FlattenedState } from "./types";

export interface P_InspectionForm {
  state: FlattenedState,
  setState: Dispatch<SetStateAction<FlattenedState>>
};

interface CategoryKeys {
  categoryName: string,
  rows: string[],
  notes: string,
};

export const InspectionForm: FC<P_InspectionForm> = ({ state, setState }): JSX.Element => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value; 
    setState({ ...state, [e.target.name]: value });
  };

  const keys: string[] = Object.keys(state);

  const splitIntoCategories = (): string[][] => {
    const categories: string[][] = [];
    let category: string[] = [];
    let index = 0;
  
    keys.forEach(key => {
      const substrings = key.split(".");
      if (parseInt(substrings[0]) === index) category.push(key);
      else {
        categories.push(category)
        index++;
        category = [ key ];
      };
    });
  
    return categories;
  };

  const categories: string[][] = splitIntoCategories();
  
  const divideCategory = (category: string[]): CategoryKeys => ({
    categoryName: category.shift()!,
    notes: category.pop()!,
    rows: category
  });

  const generateCategory = (categoryKeys: CategoryKeys) => (
    <tbody key={ `${categoryKeys.categoryName}.key` }>
      <tr>
        <td className="spacer" colSpan={ 4 }> </td>
      </tr>
  
      <tr>
        <th className="line-item-notes" colSpan={ 4 }>
          <ContentEditableDiv state={ state } setState={ setState } stateKey={ categoryKeys.categoryName } />
          {/* <input
            key={ categoryKeys.categoryName }
            type="text"
            name={ categoryKeys.categoryName }
            value={ state[categoryKeys.categoryName] as string }
            onChange={ handleInputChange }
            className="textarea-div"
          /> */}
        </th>
      </tr>
  
      { generateRows(categoryKeys) }
  
      <tr>
        <td className="line-item-notes" colSpan={ 4 }>
          {/* <div className="textarea-div" contentEditable="true">{row.notes}</div> */}
          <span>Notes:</span>
          <ContentEditableDiv state={ state } setState={ setState } stateKey={ categoryKeys.notes } />
          {/* <input
            key={ categoryKeys.notes }
            type="text"
            name={ categoryKeys.notes }
            value={ state[categoryKeys.notes] as string }
            onChange={ handleInputChange }
            className="textarea-div"
          /> */}
        </td>
      </tr>
    </tbody>
  );

  const generateRows = (categoryKeys: CategoryKeys) => {
    const rows: JSX.Element[] = [];
  
    for (let i = 0; i < categoryKeys.rows.length; i+= 4) {
      const lineItem = categoryKeys.rows[i];
      const pass = categoryKeys.rows[i + 1];
      const fail = categoryKeys.rows[i + 2];
      const notes = categoryKeys.rows[i + 3];
  
      const row = createRow(
        i,
        lineItem,
        pass,
        fail,
        notes
      );
  
      rows.push(row)
    };
  
    return rows;
  };

  const createRow = (
    key: number,
    lineItem: string,
    pass: string,
    fail: string,
    notes: string
  ) => (
    <tr key={key}>
      <td className="line-item-notes">
        <ContentEditableDiv state={ state } setState={ setState } stateKey={ lineItem } />
        {/* <input
          key={ lineItem }
          type="text"
          name={ lineItem }
          value={ state[lineItem] as string}
          onChange={ handleInputChange }
          className="textarea-div"
        /> */}
      </td>
  
      <td className="pass-fail">
        <label className="checkbox">
          <input
            key={ pass }
            type="checkbox"
            name={ pass }
            checked={ state[pass] as boolean }
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
            key={ fail }
            type="checkbox"
            name={ fail }
            checked={ state[fail] as boolean }
            onChange={ handleInputChange }
          />
          <span className="overlay">
            <div className="icon-container"><div className="icon"></div></div>
          </span>
        </label>
      </td>
  
      <td className="line-item-notes">
        <ContentEditableDiv state={ state } setState={ setState } stateKey={ notes } />
        {/* <input
          key={ notes }
          type="text"
          name={ notes }
          value={ state[notes] as string }
          onChange={ handleInputChange }
          className="textarea-div"
        /> */}
      </td>
    </tr>
  );

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

      { categories.map((category: string[]) => {
        const categoryKeys: CategoryKeys = divideCategory(category);
        return generateCategory(categoryKeys);
      }) }

    </table>
  );
};