/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import { btnColors } from "@/core/uiFactory/style";
import type { FC } from "react";
import WrapBtn from "../../HOC/WrapBtn";
import { IconType } from "react-icons/lib";
import ContentShadow from "../fragments/ContentShadow";

const BtnShadow: FC<
  PropsTypeBtn & { btnActType: BtnActType; Svg?: IconType }
> = ({ isEnabled, label, type, handleClick, btnActType, isLoading, Svg }) => {
  const clr = btnColors[btnActType];

  return (
    <WrapBtn {...{ isLoading: !!isLoading }}>
      <button type={type} disabled={!isEnabled} onClick={handleClick}>
        <ContentShadow
          {...{
            $borderClr: clr,
            $txtClr: clr,
            label,
            Svg,
            isEnabled,
          }}
        />
      </button>
    </WrapBtn>
  );
};

export default BtnShadow;
