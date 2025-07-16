/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { easeInOut, motion } from "framer-motion";
import { css, SerializedStyles } from "@emotion/react";

type PropsType = {
  txt?: string | null;
  isHover: boolean;

  $customCSS?: {
    css: SerializedStyles;
  };

  $borderClr?: string;
  $txtClr?: string;
};

const Tooltip: FC<PropsType> = ({
  txt,
  $customCSS,
  $txtClr,
  isHover,
  $borderClr,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(0%)" }}
      transition={{ duration: 0.3, ease: easeInOut }}
      animate={{
        opacity: isHover ? 1 : 0,
        transform: isHover ? "translateY(-150%)" : "translateY(0%)",
      }}
      className="absolute top-0 w-full h-fit max-w-fit py-1 px-5 pointer-events-none z-60 bg-[#000] rounded-xl"
      css={css`
        ${$customCSS?.css ??
        `
          right: 5%;
          `}
        border:2px solid var(--${$borderClr ?? "blue__600"})
      `}
    >
      <div className="w-full flex justify-center">
        <span
          className="txt__md"
          css={css`
            color: var(--${$txtClr ?? "neutral__200"});
          `}
        >
          {txt}
        </span>
      </div>

      <div className="w-[40px] h-[40px] absolute right-[10%] top-full overflow-hidden">
        <div
          css={css`
            border: 2px solid var(--${$borderClr ?? "blue__600"});
          `}
          className="absolute w-[40px] h-[40px] rotate-45 bg-[#000] translate-y-[-50%] -top-[6px]"
        ></div>
      </div>
    </motion.div>
  );
};

export default Tooltip;
