/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { easeInOut, motion } from "framer-motion";
import { css, SerializedStyles } from "@emotion/react";

type PropsType = {
  txt?: string;
  isHover: boolean;

  $customCSS?: {
    css: SerializedStyles;
  };
};

const Tooltip: FC<PropsType> = ({ txt, $customCSS, isHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(0%)" }}
      transition={{ duration: 0.3, ease: easeInOut }}
      animate={{
        opacity: isHover ? 1 : 0,
        transform: isHover ? "translateY(-150%)" : "translateY(0%)",
      }}
      css={css`
        ${$customCSS?.css ??
        `
          right: 5%;
        `}
      `}
      className="absolute top-0 w-full h-fit border-2 border-blue-600 max-w-fit py-1 px-5 pointer-events-none z-60 bg-[#000] rounded-xl"
    >
      <div className="w-full flex justify-center">
        <span className="txt__md text-neutral-300">{txt}</span>
      </div>

      <div className="w-[40px] h-[40px] absolute right-[10%] top-full overflow-hidden">
        <div className="absolute w-[40px] h-[40px] border-blue-600 border-2 rotate-45 bg-[#000] translate-y-[-50%] -top-[6px]"></div>
      </div>
    </motion.div>
  );
};

export default Tooltip;
