/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import type { FC } from "react";
import { IconType } from "react-icons/lib";
import { css, SerializedStyles } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import { btnColors } from "@/core/uiFactory/style";

export type BtnIconPropsType = Omit<PropsTypeBtn, "label"> & {
  btnActType: BtnActType;
  Svg?: IconType;
  label?: string | null;
  $svgCSS?: {
    css: SerializedStyles;
  };
};
const BtnIcon: FC<BtnIconPropsType> = ({
  isEnabled,
  label,
  type,
  handleClick,
  btnActType,
  Svg,
  $svgCSS,
}) => {
  const clr = btnColors[btnActType];

  return (
    <button
      type={type}
      disabled={!isEnabled}
      onClick={handleClick}
      className="btn__app flex w-full gap-5 py-[7.5px] px-[25px] justify-center items-center rounded-2xl"
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
      {Svg && (
        <Svg
          css={css`
            ${$svgCSS?.css ??
            `
          min-width: 35px;
          min-height: 35px;
        `}
          `}
        />
      )}

      {isStr(label) && <span className="txt__lg">{label}</span>}
    </button>
  );
};

export default BtnIcon;
