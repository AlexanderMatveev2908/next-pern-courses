/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { capt } from "@shared/first/lib/formatters";
import { Control, Path } from "react-hook-form";
import { Controller, FieldErrors, FieldValues } from "react-hook-form";
import ErrFormField from "../errors/ErrFormField";

// ? T => form shape defined in zod
// ? K => field name defined in ui factory
// ? T[K] => type of field, String or File mainly, maybe number

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FormFieldType<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  showLabel?: boolean;
  isDisabled?: boolean;
  cb?: (val: T[K]) => void;
};

const FormField = <T extends FieldValues, K extends Path<T>>({
  el,
  showLabel = true,
  control,
  errors,
  cb,
  isDisabled,
}: PropsType<T, K>) => {
  console.log(errors?.[el.name]?.message);
  return (
    <div className="">
      {showLabel && (
        <label
          htmlFor={el.name}
          className="w-full max-w-full grid grid-cols-1 gap-4"
        >
          <span className="txt__lg text-neutral-200">{el.label}</span>

          <div className="w-full flex max-w-full relative">
            <Controller
              name={el.name}
              control={control}
              render={({ field }) => (
                <input
                  ref={field.ref}
                  name={el.name}
                  placeholder={`${
                    el.place ?? `${capt(el.label)}` ?? `${capt(el.name)}`
                  }...`}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;

                    field.onChange(value);

                    if (typeof cb === "function") cb(value as T[K]);
                  }}
                  disabled={isDisabled}
                  className="w-full border-2 border-neutral-600 rounded-2xl py-2 px-5 txt__md
                text-gray-300 outline-0"
                  css={css`
                    transition: 0.3s ease-in-out;
                    &:focus {
                      box-shadow: 0 0 5px whitesmoke, 0 0 10px whitesmoke,
                        0 0 15px whitesmoke;
                    }
                  `}
                />
              )}
            />

            <ErrFormField {...{ el, errors }} />
          </div>
        </label>
      )}
    </div>
  );
};

export default FormField;
