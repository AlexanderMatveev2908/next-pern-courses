/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType } from "@/common/types/uiFactory";
import { btnColors } from "@/core/uiFactory/style";
import { css } from "@emotion/react";
import type { FC } from "react";
import { motion } from "framer-motion";

type PropsType = {
  btnAct: BtnActType;
};

const MiniSpinner: FC<PropsType> = ({ btnAct }) => {
  const clr = btnColors[btnAct];

  return (
    <motion.div
      initial={{
        rotate: 0,
      }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
      animate={{
        rotate: 360,
      }}
      className="min-w-[35px] min-h-[35px]"
      css={css`
        border: 3px solid ${clr};
        border-left-color: transparent;
        border-right-color: transparent;
        border-radius: 999px;
      `}
    ></motion.div>
  );
};

export default MiniSpinner;
