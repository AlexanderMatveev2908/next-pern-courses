/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { rowBtns } from "./uiFactory";
import BtnIcon from "../../buttons/BtnIcon/BtnIcon";
import { css } from "@emotion/react";

type PropsType = {
  currSwap: number;
  setCurrSwap: React.Dispatch<React.SetStateAction<number>>;
  totSwaps: number;
};

const RowSwapBtns: FC<PropsType> = ({ currSwap, setCurrSwap, totSwaps }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-5 items-center tb">
      {rowBtns.map((btn, i) => (
        <div
          key={btn.id}
          className="w-[75px] tb"
          css={css`
            justify-self: ${!i ? "start" : "end"};
          `}
        >
          <BtnIcon
            {...{
              ...btn,
              type: "button",
              isEnabled: !i ? !!currSwap : currSwap < totSwaps - 1,
              handleClick: () =>
                setCurrSwap((prev) => (!i ? prev - 1 : prev + 1)),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RowSwapBtns;
