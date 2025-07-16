/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import type { FC } from "react";
import { BtnActType } from "@/common/types/uiFactory";
import { css, SerializedStyles } from "@emotion/react";
import { btnColors, shadowBtnStyle } from "@/core/uiFactory/style";
import { IconType } from "react-icons/lib";
import PairSvgLabelShadow from "./fragments/PairSvgLabelShadow";

type PropsType = {
  href?: string;
  label?: string;
  Svg?: IconType;
  $customLabelCSS?: SerializedStyles;
};

const LinkShadow: FC<PropsType> = ({ href, label, Svg, $customLabelCSS }) => {
  const clr = btnColors[BtnActType.NEUTRAL];

  return !href ? (
    <div className=""></div>
  ) : (
    <Link
      href={href ?? ""}
      className={`${shadowBtnStyle.twd} el__app`}
      style={
        {
          "--scale__up": 1.2,
        } as React.CSSProperties
      }
      css={css`
        ${shadowBtnStyle.emotion({
          borderClr: clr,
          txtClr: "var(--neutral__200)",
        })}
      `}
    >
      <PairSvgLabelShadow
        {...{
          label,
          Svg,
          $customLabelCSS,
        }}
      />
    </Link>
  );
};

export default LinkShadow;
