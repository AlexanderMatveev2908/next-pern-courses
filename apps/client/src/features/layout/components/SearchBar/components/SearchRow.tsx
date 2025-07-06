/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { FormFieldType } from "@/common/types/uiFactory";
import type { FC } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

type PropsType<T extends FieldValues> = {
  mainSearchField: FormFieldType<T>;
};

const SearchRow = <T extends FieldValues>({
  mainSearchField,
}: PropsType<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="w-full flex">
      <FormFieldTxt
        {...{
          showLabel: false,
          errors,
          control,
          el: mainSearchField,
        }}
      />
    </div>
  );
};

export default SearchRow;
