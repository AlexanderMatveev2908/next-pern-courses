/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import { btnColors, shadowBtnStyle } from "@/core/uiFactory/style";
import { css } from "@emotion/react";
import type { FC } from "react";
import WrapBtn from "../../HOC/WrapBtn";
import { IconType } from "react-icons/lib";

const BtnShadow: FC<
  PropsTypeBtn & { btnActType: BtnActType; Svg?: IconType }
> = ({ isEnabled, label, type, handleClick, btnActType, isLoading, Svg }) => {
  const clr = btnColors[btnActType];

  return (
    <WrapBtn {...{ isLoading: !!isLoading }}>
      <button
        type={type}
        disabled={!isEnabled}
        onClick={handleClick}
        className={`btn__app ${shadowBtnStyle.twd}`}
        style={{ "--scale__up": 1.1 } as React.CSSProperties}
        css={css`
          ${shadowBtnStyle.emotion({ borderClr: clr })}
        `}
      >
        {Svg && <Svg className="min-w-[35px] min-h-[35px]" />}

        <span className="txt__lg">{label}</span>
      </button>
    </WrapBtn>
  );
};

export default BtnShadow;
