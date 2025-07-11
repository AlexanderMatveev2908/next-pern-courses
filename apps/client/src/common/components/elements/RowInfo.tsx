/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  info: {
    label: string;
    val: string | number;
  };
};

const RowInfo: FC<PropsType> = ({ info }) => {
  return (
    <div className="w-full max-w-full flex justify-start items-center gap-6">
      <span className="txt__md text-neutral-200">{info.label}</span>
      <span className="txt__md text-neutral-400">{info.val}</span>
    </div>
  );
};

export default RowInfo;
