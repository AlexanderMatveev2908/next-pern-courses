/** @jsxImportSource @emotion/react */
"use client";

import { FieldCheckType } from "@/common/types/uiFactory";
import type { FC } from "react";

type PropsType = {
  el: FieldCheckType;
  children: React.ReactNode;
};

const WrapCheck: FC<PropsType> = ({ el, children }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <label className="w-full grid grid-cols-1 gap-3">
        <span className="txt__lg text-neutral-200">{el.label}</span>

        {children}
      </label>
    </div>
  );
};

export default WrapCheck;
