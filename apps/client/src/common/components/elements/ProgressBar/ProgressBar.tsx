/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import type { FC } from "react";
import { css } from "@emotion/react";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType = {
  totSwaps: number;
  currSwap: number;
  maxW: number;
};

const ProgressBar: FC<PropsType> = ({ currSwap, totSwaps, maxW }) => {
  const { ids } = useGenIDsV2({
    lengths: [totSwaps],
  });

  const rat = (currSwap / (totSwaps - 1)) * 100;
  __cg("rat", rat);

  return (
    <div
      className="w-full max-w-full border-[3px] border-neutral-800 h-[50px] rounded-full flex justify-between mx-auto relative"
      css={css`
        max-width: ${maxW}px;
      `}
    >
      {ids[0].map((id, i) => (
        <div
          key={id}
          className="w-[40px] h-[40px] border-[3px] rounded-full  border-neutral-600 flex items-center justify-center p-5 relative z-60"
          css={css`
            transition: 0.4s;
            background: var(--${currSwap === i ? "white__0" : "neutral__950"});
            color: var(--${currSwap === i ? "neutral__950" : "neutral__200"});
            transform: scale(${currSwap === i ? "1.3" : "1"});
          `}
        >
          <span className="txt__lg">{i + 1}</span>
        </div>
      ))}

      <div className="w-full absolute top-0 left-0 min-h-full min-w-full overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full z-30"
          css={css`
            transition: 0.5s;
            background: var(--white__0);
            width: ${rat}%;
          `}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
