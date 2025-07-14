/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import Portal from "../../HOC/Portal";
import { css } from "@emotion/react";
import ErrFormField from "./ErrFormField";

type PropsType = {
  top: number;
  left: number;
  gappedErr?: string;
  cssZ?: number;
};

const ExternalTooltipErr: FC<PropsType> = ({ cssZ, left, top, gappedErr }) => {
  return (
    <Portal>
      <div
        className="absolute w-[200px] sm:w-[300px]"
        css={css`
          z-index: ${cssZ ?? 500};
          top: ${top}px;
          left: ${left}px;
        `}
      >
        <ErrFormField
          {...{
            el: {
              name: "",
            },
            gappedErr,
          }}
        />
      </div>
    </Portal>
  );
};

export default ExternalTooltipErr;
