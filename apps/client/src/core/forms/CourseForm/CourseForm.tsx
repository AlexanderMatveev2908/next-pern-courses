/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { type FC } from "react";
import {
  descriptionField,
  fieldHard,
  fieldMarkdown,
  fieldTech,
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
import {
  Difficulties,
  TechStack,
  Tools,
} from "@shared/first/constants/categories";
import { isObjOK } from "@shared/first/lib/dataStructure";

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

  const formData = formCtx.watch();
  const availableTool = Tools[formData.techStack as keyof typeof Tools] ?? {};

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
      <WrapCheck {...{ el: fieldHard, vals: Difficulties }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck {...{ el: fieldTech, vals: TechStack }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck
        {...{
          el: fieldTech,
          vals: availableTool,
        }}
      >
        {(args) =>
          !isObjOK(availableTool, Boolean) ? (
            <div className="w-full flex justify-center">
              <span className="txt__md text-neutral-200 pb-1 border-b border-neutral-200">
                You must chose first the Tech so we can show you the relative
                tools available
              </span>
            </div>
          ) : (
            WrapBoxes(args)
          )
        }
      </WrapCheck>
      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim {...{ type: "submit", label: "Save", isEnabled: true }} />
      </div>
    </form>
  );
};

export default CourseForm;
