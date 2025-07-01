/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, FormFieldType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure";
import { useRef } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import ErrFormField from "../errors/ErrFormField";
import BtnShadow from "../../buttons/BtnShadow/BtnShadow";
import Anchor from "../etc/Anchor";

type PropsType<T extends FieldValues> = {
  el: FormFieldType<T>;
};

const FormFieldImages = <T extends FieldValues>({ el }: PropsType<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<T>();

  const images = watch(el.name);
  const isUploadFiles = isArrOK(images, (el) => el instanceof File);
  const isURLs = isArrOK(images, (el) => typeof el === "string");

  console.log(images);

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="w-full">
      <div className=""></div>

      <div className="w-full max-w-[600px]">
        <div className="w-full relative">
          <ErrFormField {...{ el, errors }} />
          <Anchor {...{ name: el.name, register }} />
        </div>

        <label htmlFor={el.name} className="w-full grid grid-cols-1 gap-4">
          <span className="txt__lg text-neutral-200">{el.label}</span>

          <Controller
            name={el.name}
            control={control}
            render={({ field }) => (
              <input
                ref={(el) => {
                  field.ref(el);

                  inputRef.current = el;
                }}
                type="file"
                multiple
                className="w-0 h-0 opacity-0"
                accept="image/*"
                onChange={(e) => {
                  const {
                    target: { files },
                  } = e;

                  const parsed = Array.from(files ?? []);

                  field.onChange(parsed);
                }}
              />
            )}
          />

          <div className="w-full max-w-[250px]">
            <BtnShadow
              {...{
                type: "button",
                label: "Upload",
                btnActType: BtnActType.info,
                isEnabled: true,
                handleClick: handleUpload,
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default FormFieldImages;
