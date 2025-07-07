/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import WrapBtnRow from "./HOC/WrapBtnRow";
import WrapSearchBarBtn from "./HOC/WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { FaSearch } from "react-icons/fa";
import { css } from "@emotion/react";
import { Eraser } from "lucide-react";

const ThirdRawBtns: FC = ({}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-6">
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
    </div>
  );
};

export default ThirdRawBtns;
