/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { type FC } from "react";
import {
  descriptionField,
  fieldHard,
  fieldMarkdown,
  fieldTech,
  fieldTools,
  imagesField,
  titleField,
  videoField,
} from "./uiFactory";
import { useFormContext } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";
import WrapSingleField from "./components/WrapSingleField";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { useFocus } from "@/core/hooks/ui/useFocus";
import FormFieldImages from "@/common/components/forms/inputs/assets/FormFieldImages/FormFieldImages";
import FormFieldVideo from "@/common/components/forms/inputs/assets/FormFieldVideo/FormFieldVideo";
import FormFieldMD from "@/common/components/forms/inputs/assets/FormFieldMD/FormFieldMD";
import WrapCheck from "./components/WrapCheck";
import WrapBoxes from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import {
  GradePkg,
  TechStackPkg,
  ToolsPkg,
} from "@shared/first/constants/categories";
import TagsForm from "./components/TagsForm";

type PropsType = {
  handleSave: () => void;
  isLoading: boolean;
};

const CourseForm: FC<PropsType> = ({ handleSave, isLoading }) => {
  const formCtx = useFormContext<CourseFormType>();
  const {
    control,
    formState: { errors },
    setFocus,
    trigger,
  } = formCtx;

  useFocus({ cb: () => setFocus("title") });

  const formData = formCtx.watch();
  const availableTool =
    ToolsPkg[formData.techStack as keyof typeof ToolsPkg] ?? {};

  // console.log(formCtx.watch());

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

      <FormFieldVideo {...{ el: videoField, cb: () => trigger("markdown") }} />

      <FormFieldMD {...{ el: fieldMarkdown, cb: () => trigger("video") }} />

      <WrapCheck {...{ el: fieldHard, vals: GradePkg }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck {...{ el: fieldTech, vals: TechStackPkg }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck
        {...{
          el: fieldTools,
          vals: availableTool,
        }}
      >
        {(args) =>
          WrapBoxes({
            ...args,
            txtFallback:
              "You must chose first the Tech so we can show you the relative tools available",
          })
        }
      </WrapCheck>

      <TagsForm />

      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim
          {...{ type: "submit", label: "Save", isEnabled: true, isLoading }}
        />
      </div>
    </form>
  );
};

export default CourseForm;
