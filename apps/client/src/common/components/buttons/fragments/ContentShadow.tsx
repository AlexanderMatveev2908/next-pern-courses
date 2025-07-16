/** @jsxImportSource @emotion/react */
"use client";

import { css, SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  $borderClr: string;
  $txtClr?: string;
  label?: string | null;
  Svg?: IconType;
  $customLabelCSS?: SerializedStyles;
};

const ContentShadow: FC<PropsType> = ({
  $borderClr,
  $txtClr,
  label,
  Svg,
  $customLabelCSS,
}) => {
  return (
    <div
      className={`el__app w-full max-w-full border-2 py-[10px] px-[50px] flex justify-center rounded-2xl gap-6 items-center`}
      style={
        {
          "--scale__up": 1.2,
        } as React.CSSProperties
      }
      css={css`
        border: 2px solid ${$borderClr};
        color: var(--neutral__300);
        &:hover {
          box-shadow:
            0 0 5px ${$borderClr},
            0 0 10px ${$borderClr},
            0 0 15px ${$borderClr},
            0 0 20px ${$borderClr},
            0 0 25px ${$borderClr},
            0 0 30px ${$borderClr};

          color: ${$txtClr ?? $borderClr};
        }
      `}
    >
      {Svg && <Svg className="min-w-[35px] min-h-[35px]" />}
      {label && (
        <span
          css={css`
            ${$customLabelCSS}
          `}
          className="txt__lg"
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default ContentShadow;
