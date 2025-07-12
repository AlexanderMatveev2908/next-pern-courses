/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import FormFiledMiniCheck from "@/common/components/forms/inputs/FormFiledMiniCheck/FormFiledMiniCheck";
import type { FC } from "react";
import { css } from "@emotion/react";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { useFormContext } from "react-hook-form";
import { FieldDataType } from "@/common/types/uiFactory";
import { resp } from "@/core/lib/style";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType = {
  el: FormConceptType["quiz"][number];
  outerIdx: number;
};

const VariantsQuiz: FC<PropsType> = ({ el, outerIdx }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className="w-full"
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1.5rem;
        column-gap: 2.5rem;

        ${resp("md")} {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
      `}
    >
      {el.variants.map((opt, varIdx) => (
        <div
          key={opt.id}
          className="w-full gap-3"
          css={css`
            display: grid;
            place-items: end;
            grid-template-columns: 50px 1fr;
          `}
        >
          <div className="w-full max-w-full h-fit self-end">
            <FormFiledMiniCheck
              {...{
                el: {
                  ...opt.isCorrect,
                  name: `${el.field}.${outerIdx}.${opt.field}.${varIdx}.${opt.isCorrect.name}.val`,
                },
                showLabel: false,
              }}
            />
          </div>

          <FormFieldTxt
            {...{
              control,
              errors,
              showLabel: false,
              gappedErr: (errors as any)?.[el.field]?.[outerIdx]?.[opt.field]?.[
                varIdx
              ]?.[opt.answer.name]?.val?.message,
              el: {
                ...opt.answer,
                name: `${el.field}.${outerIdx}.${opt.field}.${varIdx}.${opt.answer.name}.val`,
                type: opt.answer.type as Exclude<FieldDataType, "file">,
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default VariantsQuiz;
