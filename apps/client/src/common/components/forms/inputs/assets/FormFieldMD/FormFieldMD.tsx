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
import { isStr } from "@shared/first/lib/dataStructure";

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

  const isData = isStr(markdown);

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

    const file = files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (isStr(result as string)) {
        const sanitized = DOMPurify.sanitize(result as string);

        field.onChange(sanitized);
      }
    };

    reader.readAsText(file);
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
          Preview: <PreviewMarkdown {...{ data: markdown }} />,
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
            setValue(el.name, "" as T[typeof el.name], {
              shouldValidate: true,
            });
          },
        }}
      />
    </div>
  );
};

export default FormFieldMD;
