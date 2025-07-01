/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldPropsType } from "@/common/types/uiFactory";
import { Path } from "react-hook-form";
import { Controller, FieldValues } from "react-hook-form";
import WrapFormField from "../HOC/WrapFormField";
import { getSomePlaceholder } from "@/core/lib/etc";

const FormFieldTxt = <T extends FieldValues, K extends Path<T>>({
  el,
  showLabel = true,
  control,
  errors,
  cb,
  isDisabled,
}: FormFieldPropsType<T, K>) => {
  return (
    <WrapFormField
      {...{
        el,
        errors,
        showLabel,
      }}
    >
      <Controller
        name={el.name}
        control={control}
        render={({ field }) => (
          <input
            ref={field.ref}
            name={el.name}
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
    </WrapFormField>
  );
};

export default FormFieldTxt;
