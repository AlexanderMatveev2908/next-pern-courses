/** @jsxImportSource @emotion/react */
"use client";

import { IoFilterSharp } from "react-icons/io5";
import BtnIcon, {
  BtnIconPropsType,
} from "@/common/components/buttons/BtnIcon/BtnIcon";
import { BtnActType, FormFieldArrayType } from "@/common/types/uiFactory";
import type { FC } from "react";
import { FaSort } from "react-icons/fa";
import WrapSearchBarBtn from "./WrapSearchBarBtn";

type PropsType = {
  txtInputs: FormFieldArrayType[];
};

const SearchRowBtns: FC<PropsType> = ({ txtInputs }) => {
  return (
    <div className="w-full grid grid-cols-1">
      <div className="w-full grid grid-cols-2 justify-items-center gap-6">
        <WrapSearchBarBtn>
          {(arg: Partial<BtnIconPropsType>) => (
            <BtnIcon
              {...({
                ...arg,
                btnActType: BtnActType.INFO,
                Svg: IoFilterSharp,
              } as BtnIconPropsType)}
            />
          )}
        </WrapSearchBarBtn>
        <WrapSearchBarBtn>
          {(arg: Partial<BtnIconPropsType>) => (
            <BtnIcon
              {...({
                ...arg,
                btnActType: BtnActType.INFO,
                Svg: FaSort,
              } as BtnIconPropsType)}
            />
          )}
        </WrapSearchBarBtn>
        <div className=""></div>
      </div>
      <div className="w-full grid grid-cols-2"></div>
    </div>
  );
};

export default SearchRowBtns;
