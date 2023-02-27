import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { Category, Form } from "../types";

interface P_ContentEditableDiv {
  state: Form,
  setState: Dispatch<SetStateAction<Form>>,
  payload: [ number, number | null, string ];
  isEditable: boolean
}; 

export const ContentEditableDiv: FC<P_ContentEditableDiv> = (props) => {
  const { state, setState, payload, isEditable } = props;
  const [ category, row, data ] = payload;

  const handleInputChange = (e: FormEvent<HTMLDivElement>) => {
    const newCategories: Category[] = state.categories.map(c => c);

    if (row === null) newCategories[category][data] = e.currentTarget.innerHTML;
    else newCategories[category].rows[row][data] = e.currentTarget.innerHTML;

    setState({ ...state, categories: newCategories});
  };

  const innerHTML: string = row === null
    ? state.categories[category][data] as string
    : state.categories[category].rows[row][data] as string;

  return (
    <div
      contentEditable={ isEditable }
      onBlur={ handleInputChange }
      dangerouslySetInnerHTML={ { __html: innerHTML } }
      className="textarea-div"
    ></div>
  )
};
