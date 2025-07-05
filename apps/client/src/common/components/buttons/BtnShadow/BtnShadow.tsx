/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import { btnColors } from "@/core/uiFactory/style";
import { css } from "@emotion/react";
import type { FC } from "react";
import WrapBtn from "../../HOC/WrapBtn";

const BtnShadow: FC<PropsTypeBtn & { btnActType: BtnActType }> = ({
  isEnabled,
  label,
  type,
  handleClick,
  btnActType,
  isLoading,
}) => {
  const clr = btnColors[btnActType];

  return (
    <WrapBtn {...{ isLoading: !!isLoading }}>
      <button
        type={type}
        disabled={!isEnabled}
        onClick={handleClick}
        className="btn__app w-full border-2 py-[10px] px-[50px] flex justify-center rounded-2xl"
        style={{ "--scale__up": 1.1 } as React.CSSProperties}
        css={css`
          border: 2px solid ${clr};
          &:hover {
            box-shadow:
              0 0 5px ${clr},
              0 0 10px ${clr},
              0 0 15px ${clr},
              0 0 20px ${clr},
              0 0 25px ${clr},
              0 0 30px ${clr};
          }
        `}
      >
        <span className="txt__lg text-gray-300">{label}</span>
      </button>
    </WrapBtn>
  );
};

export default BtnShadow;
