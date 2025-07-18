/** @jsxImportSource @emotion/react */
"use client";

import { FieldArrType, FormFieldType } from "@/common/types/uiFactory";
import { getSomePlaceholder } from "@/core/lib/etc";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FormFieldType<T> | FieldArrType<T, K>;
  control: Control<T>;
  isDisabled?: boolean;
  cb?: (val: T[K]) => void;
};

const RawFieldTxt = <T extends FieldValues, K extends Path<T>>({
  el,
  control,
  isDisabled = false,
  cb,
}: PropsType<T, K>) => {
  return (
    <Controller
      name={el.name as K}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          ref={field.ref}
          // name={el.name}
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

export default RawFieldTxt;
