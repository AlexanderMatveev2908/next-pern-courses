/** @jsxImportSource @emotion/react */
"use client";

import { resp } from "@/core/lib/style";
import { css } from "@emotion/react";
import type { FC } from "react";

// ? TO AVOID LEAVING INPUT GAIN A WIDTH UP TO 1000 PX JUST CUT SOME WIDTH OF LARGER SCREENS ON PERSONAL CHOICE AND POINT OF VIEW

type PropsType = {
  children: React.ReactNode;
};

const WrapSingleField: FC<PropsType> = ({ children }) => {
  return (
    <div
      css={css`
        width: 100%;

        ${resp("md")} {
          max-width: 600px;
        }
      `}
    >
      {children}
    </div>
  );
};

export default WrapSingleField;
