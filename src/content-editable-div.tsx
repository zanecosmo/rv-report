import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { FlattenedState } from "./types";

interface P_ContentEditableDiv {
  state: FlattenedState,
  setState: Dispatch<SetStateAction<FlattenedState>>,
  stateKey: string
};

export const ContentEditableDiv: FC<P_ContentEditableDiv> = ({ state, setState, stateKey }) => {

  const handleInputChange = (e: FormEvent<HTMLDivElement>) => {
    setState({ ...state, [stateKey]: e.currentTarget.innerHTML });
  };

  return (
    <div
      contentEditable={ true }
      onBlur={ handleInputChange }
      dangerouslySetInnerHTML={ { __html: state[stateKey].toString() } }
      className="textarea-div"
    ></div>
  )
};
