/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldPropsType } from "@/common/types/uiFactory";
import { Path } from "react-hook-form";
import { Controller, FieldValues } from "react-hook-form";
import WrapFormField from "../HOC/WrapFormField";
import { getSomePlaceholder } from "@/core/lib/etc";
import { isObjOK } from "@shared/first/lib/dataStructure";

const FormFieldTxt = <T extends FieldValues, K extends Path<T>>({
  el,
  showLabel = true,
  control,
  errors,
  cb,
  isDisabled,
  index,
  gappedErr,
  notice,
}: FormFieldPropsType<T, K>) => {
  return !isObjOK(el) ? null : (
    <WrapFormField
      {...{
        el,
        errors,
        showLabel,
        index,
        gappedErr,
        notice,
      }}
    >
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
    </WrapFormField>
  );
};

export default FormFieldTxt;
