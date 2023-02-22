import React, { FC, MouseEventHandler } from "react";

export const MinusButton: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
  return (
    <button className="minus" type="button" onClick={ onClick }>
      <div className="svg-minus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
          fill="#c42222"
            d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>
    </button>
  )
};