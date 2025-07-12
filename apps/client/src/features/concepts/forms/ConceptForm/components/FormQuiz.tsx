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
import { useEffect } from "react";
import { __cg } from "@shared/first/lib/logger.js";
import { BtnActType, FieldDataType } from "@/common/types/uiFactory";
import VariantsQuiz from "./components/VariantsQuiz/VariantsQuiz";
import { resp } from "@/core/lib/style";
import { FaTrashAlt } from "react-icons/fa";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { MdFormatListBulletedAdd } from "react-icons/md";

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
  useEffect(() => {
    __cg(`vls`, vls);
    __cg("errs", errors);
  }, [vls, errors]);

  const canAdd = schemaQuizItem.safeParse(
    vls.quiz?.[fieldsArg.length - 1],
  ).success;

  return (
    <WrapArrField
      {...{
        el: fieldQuiz,
        errors,
        register,
        gappedErr: errors?.quiz?.root?.message ?? errors?.quiz?.message,
      }}
    >
      <div className="w-full grid grid-cols-1 gap-14">
        {(fieldsArg ?? []).map((el, quizItemIdx) => (
          <div
            key={el.id}
            className="w-full grid grid-cols-1 gap-12 border-[3px] p-5 border-neutral-800 rounded-xl relative"
          >
            <button
              onClick={remove.bind(null, quizItemIdx)}
              className="btn__app text-red-600 absolute -top-8 -right-4 border-2 border-red-600 p-3 z-60 bg-[#000] rounded-xl"
              style={
                {
                  "--scale__up": 1.2,
                } as React.CSSProperties
              }
              type="button"
            >
              <FaTrashAlt className="min-w-[40px] min-h-[40px]" />
            </button>

            <div
              className="w-full"
              css={css`
                display: grid;
                grid-template-columns: 1fr;
                row-gap: 1.5rem;
                column-gap: 2.5rem;

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
                  gappedErr: grabNestedErr(errors, {
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
                  gappedErr: grabNestedErr(errors, {
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

        <div className="w-full max-w-[300px]">
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
