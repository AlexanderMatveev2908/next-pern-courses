/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldPropsType } from "@/common/types/uiFactory";
import { Controller, FieldValues, Path } from "react-hook-form";
import WrapFormField from "../HOC/WrapFormField";
import { getSomePlaceholder } from "@/core/lib/etc";

const FormFieldArea = <T extends FieldValues, K extends Path<T>>({
  control,
  el,
  errors,
  cb,
  isDisabled,
  showLabel = true,
  index,
  manualErr,
}: FormFieldPropsType<T, K>) => {
  return (
    <WrapFormField {...{ el, errors, showLabel, index, manualErr }}>
      <Controller
        name={el.name as K}
        control={control}
        render={({ field }) => (
          <textarea
            name={el.name}
            ref={field.ref}
            required={el.required}
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
            rows={4}
            className="el__input txt__md overflow-y-auto scroll__app"
          />
        )}
      />
    </WrapFormField>
  );
};

export default FormFieldArea;
