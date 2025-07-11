/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { useMemo, type FC } from "react";
import {
  fieldHard,
  fieldMarkdown,
  fieldRootLanguage,
  fieldStack,
  fieldTech,
  imagesField,
  videoField,
} from "./uiFactory";
import { Path, useFormContext, useWatch } from "react-hook-form";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";
import WrapSingleField from "../../../../common/components/forms/HOC/WrapSingleField";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { useFocus } from "@/core/hooks/ui/useFocus";
import FormFieldImages from "@/common/components/forms/inputs/assets/FormFieldImages/FormFieldImages";
import FormFieldVideo from "@/common/components/forms/inputs/assets/FormFieldVideo/FormFieldVideo";
import FormFieldMD from "@/common/components/forms/inputs/assets/FormFieldMD/FormFieldMD";
import WrapCheck from "./components/WrapCheck";
import WrapBoxes from "@/common/components/forms/HOC/WrapBoxes/WrapBoxes";
import {
  GradePkg,
  StackPkg,
  StackType,
  TechPkg,
} from "@shared/first/constants/categories";
import FormFiledMiniCheck from "@/common/components/forms/inputs/FormFiledMiniCheck/FormFiledMiniCheck";
import { grabValidTechs } from "@shared/first/lib/dataStructure.js";
import { parseTechObj } from "@shared/first/lib/etc.js";
import WarnForm from "@/common/components/forms/etc/WarnForm";
import { genDescriptionField, genTitleField } from "@/core/uiFactory/forms";

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
    setValue,
  } = formCtx;
  const stackVal = useWatch({
    control,
    name: "stack",
  });

  useFocus({ cb: () => setFocus("title") });

  const handleSyncCheck = (val: unknown) => {
    const techObj = TechPkg[val as keyof typeof TechPkg];

    setValue("rootLanguage", techObj.rootLanguage, {
      shouldValidate: true,
    });
  };

  const filteredTech = useMemo(
    () =>
      parseTechObj(
        grabValidTechs(stackVal as StackType).filtered as typeof TechPkg,
      ),
    [stackVal],
  );

  return (
    <form onSubmit={handleSave} className="form__shape">
      <WarnForm />

      <WrapSingleField>
        <FormFieldTxt
          {...{
            el: genTitleField<CourseFormType, Path<CourseFormType>>("Course"),
            control,
            errors,
          }}
        />
      </WrapSingleField>

      <WrapSingleField>
        <FormFieldArea
          {...{
            el: genDescriptionField<CourseFormType, Path<CourseFormType>>(
              "Course",
            ),
            control,
            errors,
          }}
        />
      </WrapSingleField>

      <FormFieldImages {...{ el: imagesField }} />

      <FormFieldVideo {...{ el: videoField }} />

      <FormFieldMD {...{ el: fieldMarkdown }} />

      <WrapCheck {...{ el: fieldHard, vals: GradePkg }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck {...{ el: fieldStack, vals: StackPkg }}>
        {(args) => WrapBoxes(args)}
      </WrapCheck>

      <WrapCheck {...{ el: fieldTech, vals: filteredTech }}>
        {(args) =>
          WrapBoxes({
            ...args,
            txtFallback:
              "Select a Stack se we can generate a list of technologies",
            cb: handleSyncCheck,
          })
        }
      </WrapCheck>

      <FormFiledMiniCheck
        {...{
          el: fieldRootLanguage,
        }}
      />

      <div className="w-full max-w-[200px] justify-self-center mt-8">
        <BtnShim
          {...{ type: "submit", label: "Save", isEnabled: true, isLoading }}
        />
      </div>
    </form>
  );
};

export default CourseForm;
