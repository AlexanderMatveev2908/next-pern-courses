/** @jsxImportSource @emotion/react */
"use client";

import { FieldCheckType } from "@/common/types/uiFactory";
import { FieldValues } from "react-hook-form";

type PropsType<T extends FieldValues> = {
  el: FieldCheckType<T>;
  children: React.ReactNode;
};

const WrapCheck = <T extends FieldValues>({ el, children }: PropsType<T>) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="w-full grid grid-cols-1 gap-3">
        <span className="txt__lg text-neutral-200">{el.label}</span>

        {children}
      </div>
    </div>
  );
};

export default WrapCheck;
