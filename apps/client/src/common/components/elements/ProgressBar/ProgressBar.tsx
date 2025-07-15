/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import type { FC } from "react";
import { css } from "@emotion/react";

type PropsType = {
  totSwaps: number;
  currSwap: number;
  maxW: number;
};

const ProgressBar: FC<PropsType> = ({ currSwap, totSwaps, maxW }) => {
  const { ids } = useGenIDsV2({
    lengths: [totSwaps],
  });

  return (
    <div className="w-full max-w-full border-[3px] border-neutral-800 h-[50px] rounded-full flex justify-between">
      {ids[0].map((id, i) => (
        <div
          key={id}
          className="w-[40px] h-[40px] border-[3px] rounded-full  border-neutral-600 flex items-center justify-center p-5"
          css={css`
            transition: 0.4s;
            background: ${currSwap === i ? "var(--white__0)" : "transparent"};
            color: var(--${currSwap === i ? "neutral__950" : "neutral__200"});
            transform: scale(${currSwap === i ? "1.3" : "1"});
          `}
        >
          <span className="txt__lg">{i + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
