/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import WrapArrField from "@/common/components/forms/HOC/WrapArrField";
import {
  ArrayPath,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { fieldQuiz } from "../uiFactory";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { __cg } from "@shared/first/lib/logger.js";
import { FieldDataType } from "@/common/types/uiFactory";
import { resp } from "@/core/lib/style";
import { optGridQuiz } from "./uiFactory";
import FormFiledMiniCheck from "@/common/components/forms/inputs/FormFiledMiniCheck/FormFiledMiniCheck";

const grabNestedErr = (
  errs: FieldErrors,
  arg: { name: string; field?: string; idx: number },
) => (errs as any)?.[arg.field ?? ""]?.[arg.idx]?.[arg.name]?.val?.message;

const FormQuiz = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<FormConceptType>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { append, remove } = useFieldArray<FormConceptType, "quiz">({
    control,
    name: "quiz",
  });

  const fieldsArg = watch("quiz");

  const vls = watch();
  useEffect(() => {
    __cg(`vls`, vls);
    __cg("errs", errors);
  }, [vls, errors]);

  return (
    <WrapArrField
      {...{
        el: fieldQuiz,
        errors,
      }}
    >
      {(fieldsArg ?? []).map((el, quizItemIdx) => (
        <div key={el.id} className="w-full grid grid-cols-1 gap-16">
          <div
            className="w-full border-[3px] border-neutral-800 p-5 rounded-xl"
            css={css`
              ${optGridQuiz}
            `}
          >
            <FormFieldTxt
              {...{
                control,
                errors,
                el: {
                  ...el.title,
                  name: `quiz.${quizItemIdx}.${el.title.name}.val` as ArrayPath<FormConceptType>,
                  type: el.title.type as Exclude<FieldDataType, "file">,
                },
                gappedErr: grabNestedErr(errors, {
                  idx: quizItemIdx,
                  name: el.title.name,
                  field: el.title.field,
                }),
              }}
            />

            <FormFieldArea
              {...{
                control,
                errors,
                el: {
                  ...el.question,
                  name: `quiz.${quizItemIdx}.${el.question.name}.val` as ArrayPath<FormConceptType>,
                  type: el.question.type as Exclude<FieldDataType, "file">,
                },
                gappedErr: grabNestedErr(errors, {
                  idx: quizItemIdx,
                  name: el.question.name,
                  field: el.question.field,
                }),
              }}
            />
          </div>

          <div
            className="w-full"
            css={css`
              ${optGridQuiz}
            `}
          >
            {/* {el.variants.map((opt) => (
              <div key={opt.id} className="w-full flex items-center gap-6">
                <FormFiledMiniCheck
                  {...{
                    el: opt.isCorrect,
                  }}
                />
              </div>
            ))} */}
          </div>
        </div>
      ))}
    </WrapArrField>
  );
};

export default FormQuiz;
