/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import type { FC } from "react";
import { IconType } from "react-icons/lib";
import { btnColors } from "../uiFactory";
import { css } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";

const BtnIcon: FC<
  Omit<PropsTypeBtn, "label"> & {
    btnActType: BtnActType;
    Svg?: IconType;
    label?: string;
  }
> = ({ isEnabled, label, type, handleClick, btnActType, Svg }) => {
  const clr = btnColors[btnActType];

  return (
    <button
      type={type}
      disabled={!isEnabled}
      onClick={handleClick}
      className="btn__app flex w-full gap-5 py-[7.5px] px-[25px] justify-center items-center rounded-2xl  disabled:cursor-not-allowed disabled:opacity-50"
      css={css`
        border: 2px solid ${clr};
        color: ${clr};
        &:enabled:hover {
          background: ${clr};
          color: var(--neutral__950);
        }
      `}
      style={{ "--scale__up": 1.25 } as React.CSSProperties}
    >
      {Svg && <Svg className="min-w-[35px] min-h-[35px]" />}

      {isStr(label) && <span className="txt__lg">{label}</span>}
    </button>
  );
};

export default BtnIcon;
