/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { capt } from "@shared/first/lib/formatters";
import { Control } from "react-hook-form";
import { Controller, FieldErrors, FieldValues } from "react-hook-form";

type PropsType<T extends FieldValues> = {
  el: FormFieldType<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  showLabel?: boolean;
};

const FormField = <T extends FieldValues>({
  el,
  showLabel = true,
  control,
}: PropsType<T>) => {
  console.log(el);

  return (
    <div className="">
      {showLabel && (
        <label
          htmlFor={el.name}
          className="w-full max-w-full grid grid-cols-1 gap-4"
        >
          <span className="txt__lg text-neutral-200">{el.label}</span>

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
        </label>
      )}
    </div>
  );
};

export default FormField;
