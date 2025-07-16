/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  $borderClr?: string;
  $clr?: string;

  txt: string;
  Svg?: IconType;
};

const LabelCard: FC<PropsType> = ({ $borderClr, Svg, $clr, txt }) => {
  const fallbackClr = $clr ?? "var(--neutral__200)";
  const fallbackBorder = $borderClr ?? "var(--neutral__800)";

  return (
    <div
      className="w-full flex justify-start items-center gap-5 bg-[#000] py-2 px-4 rounded-xl border-2"
      css={css`
        border-color: ${fallbackBorder};
        color: ${fallbackClr};
      `}
    >
      {Svg && (
        <div
          className="min-w-[35px] min-h-[35px] border-[3px] flex justify-center items-center  rounded-full"
          css={css`
            border-color: ${fallbackBorder};
          `}
        >
          <Svg className="min-w-[25px]  min-h-[25px]" />
        </div>
      )}

      <span
        className="txt__lg  clamp__txt"
        style={{
          WebkitLineClamp: 2,
        }}
      >
        {txt}
      </span>
    </div>
  );
};

export default LabelCard;
