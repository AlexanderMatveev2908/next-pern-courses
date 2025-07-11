/** @jsxImportSource @emotion/react */
"use client";

import WarnForm from "@/common/components/forms/etc/WarnForm";
import WrapSingleField from "@/common/components/forms/HOC/WrapSingleField";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { fieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  handleSave: () => void;
};

const ConceptForm: FC<PropsType> = ({ handleSave }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormConceptType>();

  const localFieldGenerator = fieldGenerator<FormConceptType>("Concept");
  return (
    <form onSubmit={handleSave} className="form__shape">
      <WarnForm />

      <WrapSingleField>
        <FormFieldTxt
          {...{
            el: localFieldGenerator.genTitleField(),
            control,
            errors,
          }}
        />
      </WrapSingleField>

      <WrapSingleField>
        <FormFieldArea
          {...{
            el: localFieldGenerator.genDescriptionField(),
            control,
            errors,
          }}
        />
      </WrapSingleField>
    </form>
  );
};

export default ConceptForm;
