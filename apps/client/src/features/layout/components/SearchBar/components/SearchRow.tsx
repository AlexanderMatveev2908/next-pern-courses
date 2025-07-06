/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import type { FC } from "react";
import { FieldValues } from "react-hook-form";

type PropsType<T extends FieldValues> = {
  mainSearchField: FormFieldType<T>;
};

const SearchRow = <T extends FieldValues>({
  mainSearchField,
}: PropsType<T>) => {
  return <div></div>;
};

export default SearchRow;
