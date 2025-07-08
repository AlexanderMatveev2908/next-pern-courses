/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import type { FC } from "react";
import { IconType } from "react-icons/lib";
import { css, SerializedStyles } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import { btnColors } from "@/core/uiFactory/style";
import { capt } from "@shared/first/lib/formatters.js";
import MiniSpinner from "../../spinners/MiniSpinner";

export type BtnIconPropsType = Omit<PropsTypeBtn, "label"> & {
  btnActType: BtnActType;
  Svg?: IconType;
  label?: string | null;
  $svgCSS?: {
    css: SerializedStyles;
  };
  $labelCSS?: {
    css: SerializedStyles;
  } | null;
  isLoading?: boolean;
};
const BtnIcon: FC<BtnIconPropsType> = ({
  isEnabled,
  label,
  type,
  handleClick,
  btnActType,
  Svg,
  $svgCSS,
  $labelCSS,
  isLoading,
}) => {
  const clr = btnColors[btnActType];

  return (
    <button
      type={type}
      disabled={!isEnabled || isLoading}
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
      {isLoading ? (
        <MiniSpinner
          {...{
            btnAct: btnActType,
          }}
        />
      ) : (
        Svg && (
          <Svg
            css={css`
              ${$svgCSS?.css ??
              `
          min-width: 35px;
          min-height: 35px;
        `}
            `}
          />
        )
      )}

      {isStr(label) && (
        <span className="txt__lg" css={$labelCSS?.css}>
          {capt(label!)}
        </span>
      )}
    </button>
  );
};

export default BtnIcon;
