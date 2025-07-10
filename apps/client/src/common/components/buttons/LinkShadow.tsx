/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import type { FC } from "react";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { btnColors } from "@/core/uiFactory/style";

type PropsType = {
  href: string;
  label: string;
};

const LinkShadow: FC<PropsType> = ({ href, label }) => {
  const clr = btnColors[BtnActType.NEUTRAL];

  return (
    <Link
      href={href}
      onClick={() => console.log("clicked")}
      className="el__app w-full border-2 py-[10px] px-[50px] flex justify-center rounded-2xl max-w-full"
      style={
        {
          "--scale__up": 1.2,
        } as React.CSSProperties
      }
      css={css`
        border: 2px solid ${clr};
        &:enabled:hover {
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
    </Link>
  );
};

export default LinkShadow;
