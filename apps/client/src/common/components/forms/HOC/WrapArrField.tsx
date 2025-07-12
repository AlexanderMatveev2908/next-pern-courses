/** @jsxImportSource @emotion/react */
"use client";

import { PropsDOM } from "@/common/types/api";
import ErrFormField from "../errors/ErrFormField";
import { ArrayPath, FieldErrors, FieldValues } from "react-hook-form";

type PropsType<T extends FieldValues, K extends ArrayPath<T>> = {
  errors: FieldErrors;
  showLabel?: boolean;
  el: {
    name: K;
    label: string;
  };
  index?: number;
} & PropsDOM;

const WrapArrField = <T extends FieldValues, K extends ArrayPath<T>>({
  el,
  errors,
  showLabel = true,
  index,
  children,
}: PropsType<T, K>) => {
  return (
    <label
      htmlFor={el?.name ?? ""}
      className="w-full max-w-full grid grid-cols-1 gap-4"
    >
      {showLabel && (
        <span className="txt__lg text-neutral-200">{el?.label}</span>
      )}

      <div className="w-full flex max-w-full relative">
        {children}

        <ErrFormField {...{ el, errors, index }} />
      </div>
    </label>
  );
};

export default WrapArrField;
