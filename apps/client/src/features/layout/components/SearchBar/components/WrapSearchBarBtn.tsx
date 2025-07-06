/** @jsxImportSource @emotion/react */
"use client";

import { BtnIconPropsType } from "@/common/components/buttons/BtnIcon/BtnIcon";
import type { FC } from "react";
import { svgSearchBarCSS } from "../uifactory/style";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

type PropsType = {
  children: (arg: Partial<BtnIconPropsType>) => React.ReactNode;
  $customCSS?: {
    css: SerializedStyles;
  };
};

const WrapSearchBarBtn: FC<PropsType> = ({ children, $customCSS }) => {
  return (
    <div
      css={css`
        ${$customCSS?.css}
      `}
      className="w-[80px]"
    >
      {children({
        $svgCSS: svgSearchBarCSS,
        isEnabled: true,
        isLoading: false,
        type: "button",
      })}
    </div>
  );
};

export default WrapSearchBarBtn;
