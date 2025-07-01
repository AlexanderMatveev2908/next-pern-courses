/** @jsxImportSource @emotion/react */
"use client";

import FormField from "@/common/components/forms/inputs/FormField";
import type { FC } from "react";
import { titleField } from "./uiFactory";
import { useFormContext } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";

type PropsType = {
  handleSave: () => void;
};

const CourseForm: FC<PropsType> = ({ handleSave }) => {
  const formCtx = useFormContext<CourseFormType>();
  const {
    control,
    formState: { errors },
  } = formCtx;

  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-10">
      <div className="max-w-1/2">
        <FormField {...{ el: titleField, control, errors }} />
      </div>

      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim {...{ type: "submit", label: "Save", isEnabled: true }} />
      </div>
    </form>
  );
};

export default CourseForm;
