/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, PropsTypeBtn } from "@/common/types/uiFactory";
import { btnColors } from "@/core/uiFactory/style";
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
        className="btn__app w-full max-w-full border-2 py-[10px] px-[50px] flex justify-center rounded-2xl gap-6 items-center"
        style={{ "--scale__up": 1.1 } as React.CSSProperties}
        css={css`
          color: var(--neutral__200);
          border: 2px solid ${clr};
          &:enabled:hover {
            box-shadow:
              0 0 5px ${clr},
              0 0 10px ${clr},
              0 0 15px ${clr},
              0 0 20px ${clr},
              0 0 25px ${clr},
              0 0 30px ${clr};

            color: ${clr};
          }
        `}
      >
        {Svg && <Svg className="min-w-[35px] min-h-[35px]" />}

        <span className="txt__lg">{label}</span>
      </button>
    </WrapBtn>
  );
};

export default BtnShadow;
