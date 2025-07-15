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
import { fieldQuiz, grabQuestionShape } from "../uiFactory";
import {
  FormConceptType,
  schemaQuizItem,
} from "@shared/first/paperwork/concepts/schema.post.js";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import FormFieldArea from "@/common/components/forms/inputs/FormFieldArea";
import { css } from "@emotion/react";
import { BtnActType, FieldDataType } from "@/common/types/uiFactory";
import VariantsQuiz from "./components/VariantsQuiz/VariantsQuiz";
import { resp } from "@/core/lib/style";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { MdFormatListBulletedAdd } from "react-icons/md";
import SubTitle from "@/common/components/elements/SubTitle";
import BtnTrash from "@/common/components/buttons/BtnTrash";

const grabNestedErr = (
  errs: FieldErrors,
  arg: { name: string; field?: string; idx: number },
) => (errs as any)?.[arg.field ?? ""]?.[arg.idx]?.[arg.name]?.val?.message;

const FormQuiz = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
  } = useFormContext<FormConceptType>();
  const { append, remove } = useFieldArray<FormConceptType, "quiz">({
    control,
    name: "quiz",
  });

  const fieldsArg = watch("quiz");

  const vls = watch();

  const canAdd = schemaQuizItem.safeParse(
    vls.quiz?.[fieldsArg.length - 1],
  ).success;

  return (
    <WrapArrField
      {...{
        el: fieldQuiz,
        errors,
        register,
        manualErr: errors?.quiz?.root?.message ?? errors?.quiz?.message,
      }}
    >
      <div className="w-full grid grid-cols-1 gap-8">
        {(fieldsArg ?? []).map((el, quizItemIdx) => (
          <div
            key={el.id}
            className="w-full grid grid-cols-1 gap-12 border-[3px] p-5 border-neutral-800 rounded-xl relative"
          >
            <BtnTrash
              {...{
                handleClick: remove.bind(null, quizItemIdx),
              }}
            />

            <SubTitle
              {...{
                txt: `Question n.${quizItemIdx} `,
              }}
            />

            <div
              className="w-full"
              css={css`
                display: grid;
                grid-template-columns: 1fr;
                row-gap: 1.5rem;
                column-gap: 2.5rem;
                margin-top: -20px;

                ${resp("md")} {
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                }
              `}
            >
              <FormFieldTxt
                {...{
                  control,
                  errors,
                  el: {
                    ...el.title,
                    name: `${el.field}.${quizItemIdx}.${el.title.name}.val` as ArrayPath<FormConceptType>,
                    type: el.title.type as Exclude<FieldDataType, "file">,
                  },
                  manualErr: grabNestedErr(errors, {
                    idx: quizItemIdx,
                    name: el.title.name,
                    field: el.field,
                  }),
                }}
              />

              <FormFieldArea
                {...{
                  control,
                  errors,
                  el: {
                    ...el.question,
                    name: `${el.field}.${quizItemIdx}.${el.question.name}.val` as ArrayPath<FormConceptType>,
                    type: el.question.type as Exclude<FieldDataType, "file">,
                  },
                  manualErr: grabNestedErr(errors, {
                    idx: quizItemIdx,
                    name: el.question.name,
                    field: el.field,
                  }),
                }}
              />
            </div>

            <VariantsQuiz
              {...{
                el,
                outerIdx: quizItemIdx,
              }}
            />
          </div>
        ))}

        <div className="w-full max-w-[350px]">
          <BtnShadow
            {...{
              btnActType: BtnActType.SUCCESS,
              isEnabled: canAdd && fieldsArg.length <= 10,
              label: "Add Question",
              type: "button",
              Svg: MdFormatListBulletedAdd,
              handleClick: () => append(grabQuestionShape()),
            }}
          />
        </div>
      </div>
    </WrapArrField>
  );
};

export default FormQuiz;
