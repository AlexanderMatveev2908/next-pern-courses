/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import Anchor from "../../etc/Anchor";
import ErrFormField from "../../errors/ErrFormField";
import { JSX } from "react/jsx-runtime";
import { css } from "@emotion/react";

type PropsType<T extends FieldValues> = {
  el: FormFieldType<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isData: boolean;
  Preview: React.ReactElement;
  onChange: ({
    e,
    field,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    field: ControllerRenderProps<T>;
  }) => void;
  accept: string;
  multiple: boolean;
};

const FieldFileInner = <T extends FieldValues>(
  {
    control,
    el,
    register,
    errors,
    isData,
    Preview,
    onChange,
    accept,
    multiple,
  }: PropsType<T>,
  ref: ForwardedRef<HTMLInputElement | null>,
) => {
  const localRef = useRef<HTMLInputElement>(null);

  // ? force bind outer ref to inner ref
  useImperativeHandle(ref, () => localRef.current as HTMLInputElement, []);

  return (
    <label htmlFor={el.name} className="w-full grid grid-cols-1">
      <span className="txt__lg text-neutral-200">{el.label}</span>

      <Controller
        name={el.name}
        control={control}
        render={({ field }) => (
          <input
            name={el.name}
            ref={(elHTML) => {
              field.ref(elHTML);

              localRef.current = elHTML;
            }}
            multiple={multiple}
            required={el.required}
            type="file"
            accept={accept}
            className="w-0 h-0 opacity-0"
            onChange={(e) => {
              onChange({ e, field });
            }}
          />
        )}
      />

      <div className="w-full relative max-w-fit">
        {Preview}

        <ErrFormField
          {...{
            el,
            errors,
            $customCSS: {
              css: css`
                min-width: 350px;
                ${isData ? "right:5%" : "left:5%"};
              `,
            },
          }}
        />
        <Anchor {...{ name: el.name, register }} />
      </div>
    </label>
  );
};

const FieldFile = forwardRef(FieldFileInner) as <T extends FieldValues>(
  props: PropsType<T> & { ref: ForwardedRef<HTMLInputElement | null> },
) => JSX.Element;

export default FieldFile;
