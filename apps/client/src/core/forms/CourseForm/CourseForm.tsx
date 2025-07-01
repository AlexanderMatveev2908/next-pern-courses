/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import type { FC } from "react";
import { descriptionField, imagesField, titleField } from "./uiFactory";
import { useFormContext } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";
import WrapSingleField from "./components/WrapSinlgeField/WrapSingleField";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { useFocus } from "@/core/hooks/ui/useFocus";
import FormFieldImages from "@/common/components/forms/inputs/FormFieldImages";

type PropsType = {
  handleSave: () => void;
};

const CourseForm: FC<PropsType> = ({ handleSave }) => {
  const formCtx = useFormContext<CourseFormType>();
  const {
    control,
    formState: { errors },
    setFocus,
  } = formCtx;

  useFocus({ cb: () => setFocus("title") });

  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-10">
      <WrapSingleField>
        <FormFieldTxt {...{ el: titleField, control, errors }} />
      </WrapSingleField>

      <WrapSingleField>
        <FormFieldArea {...{ el: descriptionField, control, errors }} />
      </WrapSingleField>

      <FormFieldImages {...{ el: imagesField }} />

      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim {...{ type: "submit", label: "Save", isEnabled: true }} />
      </div>
    </form>
  );
};

export default CourseForm;
