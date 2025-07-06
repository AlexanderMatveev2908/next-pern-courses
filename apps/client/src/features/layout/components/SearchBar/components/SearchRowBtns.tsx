/** @jsxImportSource @emotion/react */
"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BtnActType, FormFieldArrayType } from "@/common/types/uiFactory";
import { useState, type FC } from "react";
import { FaSort } from "react-icons/fa";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { css } from "@emotion/react";
import { useListenCondLabel } from "../hooks/useListenCondLabel";
import DropMenu from "@/common/components/dropMenu/DropMenu";
import { genIpsum } from "@/core/lib/etc";

type PropsType = {
  txtInputs: FormFieldArrayType[];
};

const SearchRowBtns: FC<PropsType> = ({}) => {
  const { showLabel } = useListenCondLabel({ width: 650 });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="w-full grid grid-cols-1">
        <div className="min-w-[300px] justify-self-center">
          <DropMenu
            {...{
              el: {
                label: "test",
              },
              isOpen,
              setIsOpen,
            }}
          ></DropMenu>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default SearchRowBtns;
