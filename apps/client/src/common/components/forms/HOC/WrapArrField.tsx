/** @jsxImportSource @emotion/react */
"use client";

import { PropsDOM } from "@/common/types/api";
import ErrFormField from "../errors/ErrFormField";
import {
  ArrayPath,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import Anchor from "../etc/Anchor";
import { css } from "@emotion/react";

type PropsType<T extends FieldValues, K extends ArrayPath<T>> = {
  errors: FieldErrors;
  showLabel?: boolean;
  el: {
    name: K;
    label: string;
  };
  register: UseFormRegister<T>;
  index?: number;
} & PropsDOM;

const WrapArrField = <T extends FieldValues, K extends ArrayPath<T>>({
  el,
  errors,
  showLabel = true,
  index,
  children,
  register,
}: PropsType<T, K>) => {
  return (
    <label htmlFor={el?.name ?? ""} className="w-full grid grid-cols-1 gap-4">
      <div className="w-full min-w-[250px] max-w-[350px] relative">
        <Anchor
          {...{
            name: el.name as Path<T>,
            register,
          }}
        />

        <ErrFormField
          {...{
            el,
            errors,
            index,
            $customCSS: {
              css: css`
                top: 2rem;
                right: 1rem;
              `,
            },
          }}
        />
      </div>

      {showLabel && (
        <span className="txt__lg text-neutral-200">{el?.label}</span>
      )}

      {children}
    </label>
  );
};

export default WrapArrField;
