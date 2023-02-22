import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react";
import { CategoryTEST, FormTEST } from "../types";

interface P_CheckBox {
  state: FormTEST,
  setState: Dispatch<SetStateAction<FormTEST>>,
  payload: [ number, number, "pass"  | "fail" ];
  editable: boolean
}; 

export const CheckBox: FC<P_CheckBox> = ({ state, setState, payload, editable }) => {
  const [ category, row, data ] = payload;

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editable) return;
    const newCategories: CategoryTEST[] = state.categories.map(c => c);
    newCategories[category].rows[row][data] = e.target.checked;
    setState({ ...state, categories: newCategories});
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={ state.categories[category].rows[row][data] }
        onChange={ handleCheckboxChange }
      />
      <span className="overlay">
        <div className="icon-container"><div className="icon"></div></div>
      </span>
    </label>
  )
};