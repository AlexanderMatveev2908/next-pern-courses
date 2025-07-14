/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { rowBtns } from "./uiFactory";
import BtnIcon from "../../buttons/BtnIcon/BtnIcon";
import { css } from "@emotion/react";

type PropsType = {
  currSwap: number;
  setCurrSwap:
    | React.Dispatch<React.SetStateAction<number>>
    | ((val: number) => void);
  totSwaps: number;
};

const RowSwapBtns: FC<PropsType> = ({ currSwap, setCurrSwap, totSwaps }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-5 items-center">
      {rowBtns.map((btn, i) => (
        <div
          key={btn.id}
          className="w-[75px]"
          css={css`
            justify-self: ${!i ? "start" : "end"};
          `}
        >
          <BtnIcon
            {...{
              ...btn,
              type: "button",
              isEnabled: !i ? !!currSwap : currSwap < totSwaps - 1,
              handleClick: () => setCurrSwap(!i ? currSwap - 1 : currSwap + 1),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RowSwapBtns;
