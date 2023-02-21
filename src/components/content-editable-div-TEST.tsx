import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { CategoryTEST, FormTEST } from "../types";

interface P_ContentEditableDiv {
  state: FormTEST,
  setState: Dispatch<SetStateAction<FormTEST>>,
  payload: [ number, number | null, string ];
}; 

export const ContentEditableDivTEST: FC<P_ContentEditableDiv> = ({ state, setState, payload }) => {
  const [ category, row, data ] = payload;

  const handleInputChange = (e: FormEvent<HTMLDivElement>) => {
    const newCategories: CategoryTEST[] = state.categories.map(c => c);

    if (row === null) newCategories[category][data] = e.currentTarget.innerHTML;
    else newCategories[category].rows[row][data] = e.currentTarget.innerHTML;

    setState({ ...state, categories: newCategories});
    
    ///

    // const newRow: RowTEST = {
    //   ...state.categories[category].rows[row],
    //   [data]: e.currentTarget.innerHTML
    // };

    // const newRows: RowTEST[] = state.categories[category].rows.map((r, i) => {
    //   return i === row ? newRow : r;
    // });

    // const newCategory: CategoryTEST = {
    //   ...state.categories[category],
    //   rows: newRows
    // };

    // const newCategories: CategoryTEST[] = state.categories.map((c, i) => {
    //   return i === category ? newCategory : c;
    // });

    // setState({
    //   ...state,
    //   categories: newCategories
    // });
  };

  const innerHTML: string = row === null
    ? state.categories[category][data] as string
    : state.categories[category].rows[row][data] as string;

  return (
    <div
      contentEditable={ true }
      onBlur={ handleInputChange }
      dangerouslySetInnerHTML={ { __html: innerHTML } }
      className="textarea-div"
    ></div>
  )
};
