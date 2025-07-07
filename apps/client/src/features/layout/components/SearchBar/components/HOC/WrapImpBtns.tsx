/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import WrapBtnRow from "./WrapBtnRow";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { FaSearch } from "react-icons/fa";
import { css } from "@emotion/react";
import { Eraser } from "lucide-react";

const WrapImpBtns: FC = () => {
  return (
    <WrapBtnRow>
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.SUCCESS,
          Svg: FaSearch,
          $customCSS: {
            css: css`
              justify-self: center;
            `,
          },
          labelConf: [650, "search"],
        }}
      />
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.ERROR,
          Svg: Eraser,
          $customCSS: {
            css: css`
              justify-self: center;
            `,
          },
          labelConf: [650, "reset"],
        }}
      />
    </WrapBtnRow>
  );
};

export default WrapImpBtns;
