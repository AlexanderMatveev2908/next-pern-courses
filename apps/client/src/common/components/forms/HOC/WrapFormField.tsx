/** @jsxImportSource @emotion/react */
"use client";

import { FieldArrType, FormFieldType } from "@/common/types/uiFactory";
import { FieldErrors, FieldValues } from "react-hook-form";
import ErrFormField from "../errors/ErrFormField";

type PropsType<T extends FieldValues> = {
  el?: FormFieldType<T> | FieldArrType;
  showLabel: boolean;
  errors: FieldErrors<T>;
  children: React.ReactNode;
  index?: number;
  gappedErr?: string;
};

const WrapFormField = <T extends FieldValues>({
  el,
  errors,
  showLabel,
  children,
  index,
  gappedErr,
}: PropsType<T>) => {
  return (
    <label
      htmlFor={el?.name ?? ""}
      className="w-full max-w-full grid grid-cols-1 gap-4 h-fit"
    >
      {showLabel && (
        <span className="txt__lg text-neutral-200">{el?.label}</span>
      )}

      <div className="w-full flex max-w-full relative">
        {children}

        <ErrFormField {...{ el, errors, index, gappedErr }} />
      </div>
    </label>
  );
};

export default WrapFormField;
