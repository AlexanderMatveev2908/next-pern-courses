/** @jsxImportSource @emotion/react */
"use client";

import { isStr } from "@shared/first/lib/dataStructure.js";
import type { FC } from "react";
import TxtClamp from "../elements/TxtClamp/TxtClamp";
import { css, SerializedStyles } from "@emotion/react";

type PropsType = {
  title?: string;
  children: React.ReactNode;
  $customCSS?: SerializedStyles | null;
};

const PrependTitle: FC<PropsType> = ({ title, children, $customCSS }) => {
  return (
    <div
      className="w-full flex flex-col items-center gap-8"
      css={css`
        ${$customCSS}
      `}
    >
      {isStr(title) && (
        <TxtClamp {...{ txt: title!, CSS: "txt__2xl grad__txt" }} />
      )}
      {children}
    </div>
  );
};

export default PrependTitle;
