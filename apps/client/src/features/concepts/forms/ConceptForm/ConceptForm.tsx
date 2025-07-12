/** @jsxImportSource @emotion/react */
"use client";

import WarnForm from "@/common/components/forms/etc/WarnForm";
import WrapSingleField from "@/common/components/forms/HOC/WrapSingleField";
import FormFieldImages from "@/common/components/forms/inputs/assets/FormFieldImages/FormFieldImages";
import FormFieldMD from "@/common/components/forms/inputs/assets/FormFieldMD/FormFieldMD";
import FormFieldVideo from "@/common/components/forms/inputs/assets/FormFieldVideo/FormFieldVideo";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { FieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import { type FC } from "react";
import { Path, useFormContext } from "react-hook-form";
import { css } from "@emotion/react";
import { numericFieldsConcept } from "./uiFactory";
import FormQuiz from "./components/FormQuiz";
import BtnShim from "@/common/components/buttons/BneShim/BtnShim";

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

      <FormFieldMD {...{ el: gen.genMark() }} />

      <div
        className="w-full grid gap-x-10 gap-y-5"
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        `}
      >
        {numericFieldsConcept.map((f) => (
          <FormFieldTxt
            key={f.id}
            {...{
              el: f,
              control,
              errors,
            }}
          />
        ))}
      </div>

      <FormQuiz />

      <div className="justify-self-center max-w-[300px]">
        <BtnShim
          {...{
            isEnabled: true,
            label: "Post concept",
            type: "submit",
          }}
        />
      </div>
    </form>
  );
};

export default ConceptForm;
