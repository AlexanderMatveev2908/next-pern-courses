/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";
import { ConceptType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useQuiz } from "./reducer/useQuiz";
import { FC, useMemo, useRef } from "react";
import { useResizeElementHeight } from "@/core/hooks/ui/useResizeElementHeight";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormQuizType,
  schemaQuiz,
} from "@shared/first/paperwork/concepts/schema.quiz.js";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionItem from "./components/QuestionItem";
import { __cg } from "@shared/first/lib/logger.js";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import ExternalTooltipErr from "@/common/components/forms/errors/ExternalTooltipErr";
import { isArrOK, isStr } from "@shared/first/lib/dataStructure.js";

type PropsType = {
  concept: ConceptType;
};

const FooterConcept: FC<PropsType> = ({ concept: { quizzes } }) => {
  const { currSwap, maxH, setCurrSwap, contentRef, setMaxH, stageSwap } =
    useQuiz();

  const parentRef = useRef<HTMLDivElement | null>(null);

  const optionalDep = useMemo(() => [currSwap], [currSwap]);
  useResizeElementHeight({
    contentRef,
    setMaxH,
    optionalDep,
  });

  const syncSchema = schemaQuiz.extend({}).superRefine((data, ctx) => {
    if ((data.quiz.length ?? 0) < quizzes.length)
      ctx.addIssue({
        code: "custom",
        path: ["quiz"],
        message: "Quiz is not finished",
      });

    let i = 0;

    while (i < (data.quiz?.length ?? 0)) {
      const curr = data.quiz[i];

      if (!curr?.answerIDs?.length)
        ctx.addIssue({
          code: "custom",
          path: [`quiz.${i}.answerIDs`],
          message: `question idx ${i} need answer`,
        });

      if ((curr?.answerIDs.length ?? 0) > 1)
        ctx.addIssue({
          code: "custom",
          path: [`quiz.${i}.answerIDs`],
          message: `question idx ${i} has too many answers`,
        });

      i++;
    }
  });

  const formCtx = useForm<FormQuizType>({
    resolver: zodResolver(syncSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = formCtx;
  const handleSave = handleSubmit(
    async (dataRHF) => {
      __cg("RHF", dataRHF);
    },
    (errs) => {
      __cg("errs", errs);

      if (isArrOK(errs?.quiz as any)) {
        let i = 0;

        while (i < errs!.quiz!.length!) {
          const curr = errs.quiz![i];

          if (isStr(curr?.answerIDs?.message)) {
            trigger(`quiz.${i}`);
            setCurrSwap(i);
            break;
          }

          i++;
        }
      }

      return errs;
    },
  );

  const { posParent } = useGetPosPortal({
    contentRef: parentRef,
  });

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-8">
        <SubTitle {...{ txt: "Questions" }} />

        <ExternalTooltipErr
          {...{
            top: posParent[0],
            left: posParent[1] - 100,
            gappedErr: errors?.quiz?.message,
            cssZ: 750,
          }}
        />

        <div
          ref={parentRef}
          className="mx-auto w-full max-w-[1000px] border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-10 overflow-hidden transition-all duration-[0.4s]"
          css={css`
            /* general hypothetical hight of btns rows for all screens and font sizes */
            max-height: ${maxH + 200}px;
          `}
        >
          <motion.div
            className="grid gap-[10%]"
            css={css`
              max-width: ${quizzes.length * 100}%;
              align-items: start;
              grid-template-columns: repeat(${quizzes.length}, 100%);
              justify-items: center;
              max-height: ${maxH}px;
            `}
            initial={{
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            animate={{
              x: `-${currSwap * 110}%`,
            }}
          >
            {quizzes.map((q, i) => (
              <QuestionItem
                key={q.id}
                {...{
                  currSwap,
                  outerIdx: i,
                  question: q,
                  stageSwap,
                }}
                ref={contentRef}
              />
            ))}
          </motion.div>

          <RowSwapBtns
            {...{
              currSwap,
              setCurrSwap,
              totSwaps: quizzes.length,
            }}
          />
        </div>

        <div className="w-[250px] justify-self-center">
          <BtnShadow
            {...{
              btnActType: BtnActType.SUCCESS,
              isEnabled: true,
              label: "Send quiz",
              type: "submit",
              isLoading: false,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FooterConcept;
