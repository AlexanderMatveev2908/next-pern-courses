/** @jsxImportSource @emotion/react */
"use client";

import FormField from "@/common/components/inputs/FormField";
import type { FC } from "react";
import { titleField } from "./uiFactory";
import { useFormContext } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";

type PropsType = {
  handleSave: () => void;
};

const CourseForm: FC<PropsType> = ({ handleSave }) => {
  const formCtx = useFormContext<CourseFormType>();
  const {
    control,
    formState: { errors, isValid },
  } = formCtx;

  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-10">
      <FormField {...{ el: titleField, control, errors }} />
    </form>
  );
};

export default CourseForm;
