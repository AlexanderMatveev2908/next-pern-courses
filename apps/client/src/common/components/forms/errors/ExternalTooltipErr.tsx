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
  zCSS?: number;
  condHide?: boolean;
};

const ExternalTooltipErr: FC<PropsType> = ({
  zCSS,
  left,
  top,
  manualErr,
  condHide,
}) => {
  return condHide ? null : (
    <Portal>
      <div
        className="absolute w-[200px] sm:w-[300px]"
        css={css`
          z-index: ${zCSS ?? 250};
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
