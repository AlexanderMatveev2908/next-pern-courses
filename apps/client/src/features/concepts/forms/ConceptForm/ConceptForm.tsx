/** @jsxImportSource @emotion/react */
"use client";

import WarnForm from "@/common/components/forms/etc/WarnForm";
import WrapSingleField from "@/common/components/forms/HOC/WrapSingleField";
import FormFieldImages from "@/common/components/forms/inputs/assets/FormFieldImages/FormFieldImages";
import FormFieldVideo from "@/common/components/forms/inputs/assets/FormFieldVideo/FormFieldVideo";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { FieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import type { FC } from "react";
import { Path, useFormContext } from "react-hook-form";

type PropsType = {
  handleSave: () => void;
};

const ConceptForm: FC<PropsType> = ({ handleSave }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormConceptType>();

  const gen = new FieldGenerator<FormConceptType, Path<FormConceptType>>(
    "Concept",
  );
  return (
    <form onSubmit={handleSave} className="form__shape">
      <WarnForm />

      <WrapSingleField>
        <FormFieldTxt
          {...{
            el: gen.genTitle(),
            control,
            errors,
          }}
        />
      </WrapSingleField>

      <WrapSingleField>
        <FormFieldArea
          {...{
            el: gen.genDesc(),
            control,
            errors,
          }}
        />
      </WrapSingleField>

      <FormFieldImages
        {...{
          el: gen.genImages(),
        }}
      />

      <FormFieldVideo
        {...{
          el: gen.genVideo(),
        }}
      />
    </form>
  );
};

export default ConceptForm;
