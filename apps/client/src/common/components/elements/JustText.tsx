/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import type { FC } from "react";

type PropsType = {
  $display?: string;
  $styleTwd?: string;
  txt?: string | null;
  isTitle?: boolean;
};

const JustText: FC<PropsType> = ({ $display, $styleTwd, txt, isTitle }) => {
  return (
    <div
      className="w-full flex"
      css={css`
        display: ${$display ?? "center"};
      `}
    >
      <span
        className={`${isTitle ? "txt__2xl grad__txt" : ($styleTwd ?? "txt__xl text-neutral-200")}`}
      >
        {txt}
      </span>
    </div>
  );
};

export default JustText;
