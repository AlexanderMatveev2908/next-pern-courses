/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import type { FC } from "react";
import {
  descriptionField,
  fieldHard,
  fieldMarkdown,
  imagesField,
  titleField,
  videoField,
} from "./uiFactory";
import { useFormContext } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";
import WrapSingleField from "./components/WrapSinlgeField/WrapSingleField";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { useFocus } from "@/core/hooks/ui/useFocus";
import FormFieldImages from "@/common/components/forms/inputs/assets/FormFieldImages/FormFieldImages";
import FormFieldVideo from "@/common/components/forms/inputs/assets/FormFieldVideo/FormFieldVideo";
import FormFieldMD from "@/common/components/forms/inputs/assets/FormFieldMD/FormFieldMD";
import WrapCheck from "./components/WrapCheck/WrapCheck";
import WrapBoxes from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import { Difficulties } from "@shared/first/constants/categories";

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
      <div className="w-full flex justify-end">
        <span className="txt__md text-gray-300">
          Fields marked with * are required
        </span>
      </div>

      <WrapSingleField>
        <FormFieldTxt {...{ el: titleField, control, errors }} />
      </WrapSingleField>

      <WrapSingleField>
        <FormFieldArea {...{ el: descriptionField, control, errors }} />
      </WrapSingleField>

      <FormFieldImages {...{ el: imagesField }} />

      <FormFieldVideo {...{ el: videoField }} />

      <FormFieldMD {...{ el: fieldMarkdown }} />
      <WrapCheck {...{ el: fieldHard }}>
        <WrapBoxes
          {...{
            vals: Object.values(Difficulties),
            typeBox: "radio",
            el: fieldHard,
          }}
        />
      </WrapCheck>
      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim {...{ type: "submit", label: "Save", isEnabled: true }} />
      </div>
    </form>
  );
};

export default CourseForm;
