/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { css } from "@emotion/react";

type PropsType = {
  txt: string;
  $display?: string;
  $styleTwd?: string;
};

const SubTitle: FC<PropsType> = ({ txt, $display, $styleTwd }) => {
  return (
    <div
      className="w-full flex"
      css={css`
        display: ${$display ?? "center"};
      `}
    >
      <span className={`${$styleTwd ?? "txt__xl text-neutral-200"}`}>
        {txt}
      </span>
    </div>
  );
};

export default SubTitle;
