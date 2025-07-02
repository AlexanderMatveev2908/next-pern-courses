/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { easeInOut, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { css, SerializedStyles } from "@emotion/react";

type PropsType = {
  $customCSS: {
    css: SerializedStyles;
  };
};

const BounceErr: FC<PropsType> = ({ $customCSS }) => {
  return (
    <motion.div
      className="w-full flex justify-center"
      transition={{ duration: 0.8, ease: easeInOut }}
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{
        scaleX: [1.6, 0.6, 1.3, 0.9, 1.05, 1],
        scaleY: [0.4, 1.4, 0.7, 1.2, 0.95, 1],
      }}
    >
      <CircleAlert
        className="text-red-600"
        css={css`
          ${$customCSS.css}
        `}
      />
    </motion.div>
  );
};

export default BounceErr;
