/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import { QuestionType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { forwardRef, RefObject, useMemo } from "react";
import VariantQuiz from "./components/VariantQuiz";
import { useFormContext } from "react-hook-form";
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import ExternalTooltipErr from "@/common/components/forms/errors/ExternalTooltipErr";
import { SwapStageType } from "../reducer/initState";

type PropsType = {
  outerIdx: number;
  currSwap: number;
  question: QuestionType;
  stageSwap: SwapStageType;
};

const QuestionItem = forwardRef<HTMLDivElement, PropsType>(
  ({ currSwap, outerIdx, question, stageSwap }, contentRef) => {
    const {
      formState: { errors },
    } = useFormContext<FormQuizType>();

    const optDep = useMemo(() => [errors], [errors]);
    const { posParent } = useGetPosPortal({
      contentRef: contentRef as RefObject<HTMLDivElement | null>,
      optDep,
    });

    return (
      <div
        ref={
          outerIdx === currSwap && stageSwap === "swapped" ? contentRef : null
        }
        key={question.id}
        className="w-full h-fit p-3 grid grid-cols-1 gap-4 text-white relative"
        css={css`
          transition: 0.4s;
          opacity: ${outerIdx === currSwap ? 1 : 0};
          pointer-events: ${outerIdx === currSwap ? "all" : "none"};
        `}
      >
        <ExternalTooltipErr
          {...{
            top: posParent[0],
            left: posParent[1],
            gappedErr:
              currSwap === outerIdx &&
              (errors as any)?.quiz?.[outerIdx]?.answerIDs?.message,
          }}
        />

        <SubTitle
          {...{
            txt: question.title,
            $styleTwd: "txt__lg text-neutral-200",
          }}
        />

        <SubTitle
          {...{
            txt: question.question,
            $styleTwd: "txt__md text-neutral-400",
          }}
        />

        <div className="w-full grid grid-cols-1 gap-6">
          {question.variants.map((vrt) => (
            <VariantQuiz
              key={vrt.id}
              {...{
                variant: vrt,
                outerIdx,
              }}
            />
          ))}
        </div>
      </div>
    );
  },
);

QuestionItem.displayName = "QuestionItem";

export default QuestionItem;
