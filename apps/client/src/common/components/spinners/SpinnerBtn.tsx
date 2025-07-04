/** @jsxImportSource @emotion/react */

"use client";

import { useMemo, type FC } from "react";
import { v4 } from "uuid";
import { easeInOut, motion } from "framer-motion";
import { css } from "@emotion/react";

const SpinnerBtn: FC = ({}) => {
  const ids = useMemo(() => Array.from({ length: 4 }, () => v4()), []);

  return (
    <div className="flex gap-5 items-center">
      {ids.map((id, i) => (
        <motion.div
          key={id}
          css={css`
            background: var(--white__0);
            box-shadow:
              0 0 5px var(--white__0),
              0 0 10px var(--white__0),
              0 0 15px var(--white__0),
              0 0 20px var(--white__0),
              0 0 25px var(--white__0);
            border-radius: 50%;
          `}
          className="w-[30px] h-[30px] sm:w-40px sm:h-[40px]"
          transition={{
            duration: 1,
            delay: (i * 1) / ids.length,
            ease: easeInOut,
            repeat: Infinity,
          }}
          animate={{
            scale: [1, 1.25, 1],
            y: [0, 35, 0],
          }}
        ></motion.div>
      ))}
    </div>
  );
};

export default SpinnerBtn;
