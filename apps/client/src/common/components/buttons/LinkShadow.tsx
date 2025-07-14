/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import type { FC } from "react";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { btnColors } from "@/core/uiFactory/style";
import { IconType } from "react-icons/lib";

type PropsType = {
  href?: string;
  label?: string;
  Svg?: IconType;
};

const LinkShadow: FC<PropsType> = ({ href, label, Svg }) => {
  const clr = btnColors[BtnActType.NEUTRAL];

  return !href ? (
    <div className=""></div>
  ) : (
    <Link
      href={href ?? ""}
      className="el__app w-full border-2 py-[10px] px-[50px] flex justify-center rounded-2xl max-w-full items-center gap-6 text-gray-300"
      style={
        {
          "--scale__up": 1.2,
        } as React.CSSProperties
      }
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
      {Svg && <Svg className="min-w-[35px] min-h-[35px]" />}
      {label && <span className="txt__lg">{label}</span>}
    </Link>
  );
};

export default LinkShadow;
