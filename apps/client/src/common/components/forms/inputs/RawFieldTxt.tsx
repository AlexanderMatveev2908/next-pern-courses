/** @jsxImportSource @emotion/react */
"use client";

import { FieldArrType, FormFieldType } from "@/common/types/uiFactory";
import { getSomePlaceholder } from "@/core/lib/etc";
import { forwardRef, RefObject, useImperativeHandle, useRef } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { JSX } from "react/jsx-runtime";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FormFieldType<T> | FieldArrType<T, K>;
  control: Control<T>;
  isDisabled?: boolean;
  cb?: (val: T[K]) => void;
};

const RawFieldTxInner = <T extends FieldValues, K extends Path<T>>(
  { el, control, isDisabled = false, cb }: PropsType<T, K>,
  inputRef?: React.Ref<HTMLInputElement | null>,
) => {
  const localRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(inputRef, () => localRef.current!, []);

  return (
    <Controller
      name={el.name as K}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          ref={(node) => {
            field.ref(node);
            localRef.current = node;
          }}
          required={el.required}
          type={el.type ?? "text"}
          placeholder={getSomePlaceholder(el)}
          value={field.value ?? ""}
          onChange={(e) => {
            const {
              target: { value },
            } = e;

            field.onChange(value);

            if (typeof cb === "function") cb(value as T[K]);
          }}
          disabled={isDisabled}
          className="el__input txt__md"
        />
      )}
    />
  );
};

const RawFieldTxt = forwardRef(RawFieldTxInner) as <
  T extends FieldValues,
  K extends Path<T>,
>(
  props: PropsType<T, K> & {
    ref?: RefObject<HTMLInputElement | null>;
  },
) => JSX.Element;

export default RawFieldTxt;
