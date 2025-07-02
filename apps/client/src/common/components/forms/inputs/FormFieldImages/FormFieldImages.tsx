/** @jsxImportSource @emotion/react */
"use client";

import { BtnActType, FormFieldType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure";
import { useRef } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import BtnShadow from "../../../buttons/BtnShadow/BtnShadow";
import PreviewImagesList from "./components/PreviewImagesList";
import FieldFile from "../FieldFile";

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
  const isData = isUploadFiles || isURLs;

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = ({
    field,
    e,
  }: {
    field: ControllerRenderProps<T>;
    e: React.ChangeEvent<HTMLInputElement>;
  }) => {
    const {
      target: { files },
    } = e;

    const parsed = Array.from(files ?? []);

    field.onChange(parsed);
  };

  return (
    <div className="w-full">
      <FieldFile
        {...{
          accept: "image/*",
          control,
          multiple: true,
          el,
          register,
          errors,
          isData,
          onChange: handleChange,
          Preview: <PreviewImagesList {...{ images, setValue, el }} />,
        }}
        ref={inputRef}
      />

      <div className="w-full max-w-[600px] mt-4">
        <div className="w-full max-w-[250px]">
          <BtnShadow
            {...{
              type: "button",
              label: !isData
                ? "Upload"
                : isUploadFiles
                  ? `${images.length} Files`
                  : `${images.length} URLs`,
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

export default FormFieldImages;
