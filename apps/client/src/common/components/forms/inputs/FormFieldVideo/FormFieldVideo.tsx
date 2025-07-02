/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, FormFieldType } from "@/common/types/uiFactory";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { isStr } from "@shared/first/lib/dataStructure";
import BtnShadow from "../../../buttons/BtnShadow/BtnShadow";
import { useRef } from "react";
import PreviewVideo from "./components/PreviewVideo";
import FieldFile from "../FieldFile";

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

  const vid = watch(el.name);
  const isURL = isStr(vid);
  const isFile = (vid as File) instanceof File && vid.type.startsWith("video");
  const isData = isURL || isFile;

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = ({
    e,
    field,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    field: ControllerRenderProps<T>;
  }) => {
    const {
      target: { files },
    } = e;

    field.onChange(files?.[0] ?? null);
  };

  return (
    <div className="w-full">
      <FieldFile
        {...{
          accept: "video/*",
          control,
          el,
          errors,
          isData,
          multiple: false,
          onChange: handleChange,
          Preview: <PreviewVideo {...{ vid: vid }} />,
          register,
        }}
        ref={inputRef}
      />

      <div className="w-full max-w-[600px] mt-4">
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
