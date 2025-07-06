/** @jsxImportSource @emotion/react */
"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BtnActType, FormFieldArrayType } from "@/common/types/uiFactory";
import type { FC } from "react";
import { FaSort } from "react-icons/fa";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { css } from "@emotion/react";
import { useListenCondLabel } from "../hooks/useListenCondLabel";

type PropsType = {
  txtInputs: FormFieldArrayType[];
};

const SearchRowBtns: FC<PropsType> = ({}) => {
  const { showLabel } = useListenCondLabel({ width: 650 });

  return (
    <div className="w-full grid grid-cols-1">
      <div className="w-full grid grid-cols-2 justify-items-center gap-6">
        <WrapSearchBarBtn
          {...{
            btnActType: BtnActType.INFO,
            Svg: IoFilterSharp,
            $customCSS: {
              css: css`
                justify-self: center;
              `,
            },
            label: showLabel ? "Filter" : null,
          }}
        />
        <WrapSearchBarBtn
          {...{
            btnActType: BtnActType.INFO,
            Svg: FaSort,
            $customCSS: {
              css: css`
                justify-self: center;
              `,
            },
            label: showLabel ? "Sort" : null,
          }}
        />
        <div className=""></div>
      </div>
      <div className="w-full grid grid-cols-2"></div>
    </div>
  );
};

export default SearchRowBtns;
