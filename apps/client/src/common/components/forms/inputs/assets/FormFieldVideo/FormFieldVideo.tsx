/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { isStr } from "@shared/first/lib/dataStructure";
import { useRef } from "react";
import PreviewVideo from "./components/PreviewVideo";
import FieldFile from "../FieldFile";
import RowButtonsFile from "@/common/components/HOC/assets/RowButtonsFile";

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
    setValue,
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

  const handleRemove = () => {
    setValue(el.name, null as unknown as T[typeof el.name], {
      shouldValidate: true,
    });
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

      <RowButtonsFile
        {...{
          handleRemove,
          handleUpload,
          isData,
          isFile,
        }}
      />
    </div>
  );
};

export default FormFieldVideo;
