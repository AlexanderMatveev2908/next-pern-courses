/** @jsxImportSource @emotion/react */
"use client";

import { PropsTypeWrapBoxes } from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import { FieldCheckType } from "@/common/types/uiFactory";
import { FieldValues, Path } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FieldCheckType<T>;
  vals: Record<string, string>;
  children: (args: PropsTypeWrapBoxes<T, K>) => React.ReactNode;
  cb?: (val: T[K]) => void;
};

const WrapCheck = <T extends FieldValues, K extends Path<T>>({
  el,
  vals,
  children,
  cb,
}: PropsType<T, K>) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <span className="txt__lg text-neutral-200">{el.label}</span>

      {children({
        el,
        vals,
        cb,
      })}
    </div>
  );
};

export default WrapCheck;
