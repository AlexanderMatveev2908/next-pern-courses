/** @jsxImportSource @emotion/react */
"use client";

import { FormFieldPropsType } from "@/common/types/uiFactory";
import { Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import WrapFormField from "../HOC/WrapFormField";
import { isObjOK } from "@shared/first/lib/dataStructure";
import RawFieldTxt from "./RawFieldTxt";

const FormFieldTxt = <T extends FieldValues, K extends Path<T>>({
  el,
  showLabel = true,
  control,
  errors,
  cb,
  isDisabled,
  index,
  manualErr,
  notice,
}: FormFieldPropsType<T, K>) => {
  return !isObjOK(el) ? null : (
    <WrapFormField
      {...{
        el,
        errors,
        showLabel,
        index,
        manualErr,
        notice,
      }}
    >
      <RawFieldTxt
        {...{
          control,
          el,
          cb,
          isDisabled,
        }}
      />
    </WrapFormField>
  );
};

export default FormFieldTxt;
