/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, FormFieldType } from "@/common/types/uiFactory";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import ErrFormField from "../errors/ErrFormField";
import { isStr } from "@shared/first/lib/dataStructure";
import { css } from "@emotion/react";
import Anchor from "../etc/Anchor";
import BtnShadow from "../../buttons/BtnShadow/BtnShadow";
import { useRef } from "react";

type PropsType<T extends FieldValues> = {
  el: FormFieldType<T>;
};

const FormFieldVideo = <T extends FieldValues>({ el }: PropsType<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<T>();

  console.log(el);

  const vid = watch(el.name);
  const isURL = isStr(vid);
  const isFile = (vid as File) instanceof File && vid.type.startsWith("video");
  const isData = isURL || isFile;

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="w-full">
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
                inputRef.current = elHTML;
              }}
              required={el.required}
              type="file"
              // accept="video/*"
              className="w-0 h-0 opacity-0"
              onChange={(e) => {
                const {
                  target: { files },
                } = e;

                field.onChange(files?.[0] ?? null);
              }}
            />
          )}
        />

        <div className="w-full relative max-w-fit">
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

      <div className="w-full max-w-1/2 mt-4">
        <div className="w-full max-w-[250px]">
          <BtnShadow
            {...{
              type: "button",
              label: !isData ? "Upload" : isFile ? `1 File` : `1 URL`,
              btnActType: BtnActType.info,
              isEnabled: true,
              handleClick: handleUpload,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFieldVideo;
