/** @jsxImportSource @emotion/react */
"use client";

import WrapBtnRow from "./WrapBtnRow";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { FaSearch } from "react-icons/fa";
import { css } from "@emotion/react";
import { Eraser } from "lucide-react";
import { DefaultValues, FieldValues, useFormContext } from "react-hook-form";
import { v4 } from "uuid";

type PropsType<T extends FieldValues> = {
  txtInputs: T["txtInputs"];
};

const WrapImpBtns = <T extends FieldValues>({ txtInputs }: PropsType<T>) => {
  const { reset } = useFormContext<T>();

  const handleReset = () => {
    reset({
      txtInputs: [
        {
          ...txtInputs[0],
          id: v4(),
        },
      ],
    } as unknown as DefaultValues<T>);
  };

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
          type: "submit",
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
          handleClick: handleReset,
        }}
      />
    </WrapBtnRow>
  );
};

export default WrapImpBtns;
