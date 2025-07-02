/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import FieldFile from "../FieldFile";
import PreviewMarkdown from "./components/PreviewMarkdown/PreviewMarkdown";
import { useRef } from "react";
import RowButtonsFile from "@/common/components/HOC/assets/RowButtonsFile";
import DOMPurify from "dompurify";

type PropsType<T extends FieldValues> = {
  el: FormFieldType<T>;
};

const FormFieldMD = <T extends FieldValues>({ el }: PropsType<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useFormContext<T>();

  const markdown = watch(el.name);

  const isData = (markdown as File) instanceof File;

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const txt: string | ArrayBuffer | null | undefined = e.target?.result;

      console.log(txt);

      const sanitized = DOMPurify.sanitize(txt as string);

      console.log(sanitized);
    };

    reader.readAsText(files?.[0] ?? new Blob());

    field.onChange(files?.[0] ?? null);
  };

  return (
    <div className="w-full">
      <FieldFile
        {...{
          el,
          accept: ".md,.markdown,text/markdown",
          control,
          register,
          errors,
          multiple: false,
          isData,
          Preview: <PreviewMarkdown />,
          onChange: handleChange,
        }}
        ref={inputRef}
      />

      <RowButtonsFile
        {...{
          isData,
          isFile: isData,
          handleUpload: () => {
            if (inputRef.current) inputRef.current.click();
          },
          handleRemove: () => {
            setValue(el.name, null as T[typeof el.name], {
              shouldValidate: true,
            });
          },
        }}
      />
    </div>
  );
};

export default FormFieldMD;
