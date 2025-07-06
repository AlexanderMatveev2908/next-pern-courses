/** @jsxImportSource @emotion/react */
"use client";

import BtnIcon from "@/common/components/buttons/BtnIcon/BtnIcon";
import type { FC } from "react";
import { svgSearchBarCSS } from "../uifactory/style";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { BtnActType } from "@/common/types/uiFactory";
import { IconType } from "react-icons/lib";
import { isStr } from "@shared/first/lib/dataStructure.js";

type PropsType = {
  $customCSS?: {
    css: SerializedStyles;
  };

  btnActType: BtnActType;
  Svg?: IconType;
  label?: string | null;

  handleClick?: () => void;
};

const WrapSearchBarBtn: FC<PropsType> = ({
  $customCSS,
  btnActType,
  Svg,
  handleClick,
  label,
}) => {
  return (
    <div
      css={css`
        width: ${isStr(label) ? 200 : 80}px;
        ${$customCSS?.css}
      `}
    >
      <BtnIcon
        {...{
          $svgCSS: svgSearchBarCSS,
          isEnabled: true,
          isLoading: false,
          type: "button",
          label,
          btnActType,
          Svg,
          handleClick,
        }}
      />
    </div>
  );
};

export default WrapSearchBarBtn;
