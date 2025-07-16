/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import Portal from "../../HOC/Portal";
import { css } from "@emotion/react";
import ErrFormField from "./ErrFormField";

type PropsType = {
  top: number;
  left: number;
  manualErr?: string;
};

const ExternalTooltipErr: FC<PropsType> = ({ left, top, manualErr }) => {
  return (
    <Portal>
      <div
        className="absolute w-[200px] sm:w-[300px]"
        css={css`
          z-index: ${250};
          top: ${top}px;
          left: ${left}px;
        `}
      >
        <ErrFormField
          {...{
            el: {
              name: "",
            },
            manualErr,
          }}
        />
      </div>
    </Portal>
  );
};

export default ExternalTooltipErr;
