/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import type { FC } from "react";
import { BtnActType } from "@/common/types/uiFactory";
import { SerializedStyles } from "@emotion/react";
import { btnColors } from "@/core/uiFactory/style";
import { IconType } from "react-icons/lib";
import ContentShadow from "./fragments/ContentShadow";

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
    <Link href={href} className="w-full">
      <ContentShadow
        {...{
          $borderClr: clr,
          $txtClr: clr,
          label,
          Svg,
          $customLabelCSS,
        }}
      />
    </Link>
  );
};

export default LinkShadow;
