/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldType } from "@/common/types/uiFactory";
import type { FC } from "react";

type PropsType = {
  el: FormFieldType;
};

const FormField: FC<PropsType> = ({ el }) => {
  console.log(el);

  return <div></div>;
};

export default FormField;
