/** @jsxImportSource @emotion/react */
"use client";

import WarnForm from "@/common/components/forms/etc/WarnForm";
import WrapSingleField from "@/common/components/forms/HOC/WrapSingleField";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { genTitleField } from "@/core/uiFactory/forms";
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

  return (
    <form onSubmit={handleSave} className="form__shape">
      <WarnForm />

      <WrapSingleField>
        <FormFieldTxt
          {...{
            el: genTitleField<FormConceptType, Path<FormConceptType>>(
              "Concept",
            ),
            control,
            errors,
          }}
        />
      </WrapSingleField>
    </form>
  );
};

export default ConceptForm;
