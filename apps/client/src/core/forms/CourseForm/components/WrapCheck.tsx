/** @jsxImportSource @emotion/react */
"use client";

import { PropsTypeWrapBoxes } from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import { FieldCheckType } from "@/common/types/uiFactory";
import { FieldValues } from "react-hook-form";

type PropsType<T extends FieldValues> = {
  el: FieldCheckType<T>;
  vals: Record<string, string>;
  children: (args: PropsTypeWrapBoxes<T>) => React.ReactNode;
};

const WrapCheck = <T extends FieldValues>({
  el,
  vals,
  children,
}: PropsType<T>) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <span className="txt__lg text-neutral-200">{el.label}</span>

      {children({
        el,
        vals,
      })}
    </div>
  );
};

export default WrapCheck;
