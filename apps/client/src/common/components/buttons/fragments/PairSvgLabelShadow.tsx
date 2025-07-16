/** @jsxImportSource @emotion/react */
"use client";

import { css, SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  Svg?: IconType;
  label?: string | null;
  $customLabelCSS?: SerializedStyles;
};

const PairSvgLabelShadow: FC<PropsType> = ({ label, Svg, $customLabelCSS }) => {
  return (
    <>
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
    </>
  );
};

export default PairSvgLabelShadow;
