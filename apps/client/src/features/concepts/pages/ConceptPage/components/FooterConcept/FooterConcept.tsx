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
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionItem from "./components/QuestionItem";
import { __cg } from "@shared/first/lib/logger.js";
import BtnShadow from "@/common/components/buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import ExternalTooltipErr from "@/common/components/forms/errors/ExternalTooltipErr";
import { isArrOK, isStr } from "@shared/first/lib/dataStructure.js";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";
import { useParams } from "next/navigation";
import ProgressBar from "@/common/components/elements/ProgressBar/ProgressBar";
import { useExtendSchemaQuiz } from "./hooks/useExtendSchemaQuiz";

type PropsType = {
  concept: ConceptType;
};

const FooterConcept: FC<PropsType> = ({ concept }) => {
  const { questions, isCompleted } = concept;

  const { currSwap, maxH, setCurrSwap, contentRef, setMaxH, stageSwap } =
    useQuiz();

  const { conceptID } = useParams();

  const parentRef = useRef<HTMLDivElement | null>(null);

  const optionalDep = useMemo(() => [currSwap], [currSwap]);
  useResizeElementHeight({
    contentRef,
    setMaxH,
    optionalDep,
  });

  const [mutate, { isLoading }] =
    conceptsSliceAPI.useCheckQuizAnswersMutation();
  const { wrapMutation } = useWrapMutation();

  const { syncSchema } = useExtendSchemaQuiz({ concept });
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
      const res = await wrapMutation({
        cbAPI: () => mutate({ data: dataRHF, conceptID: conceptID as string }),
      });

      if (!res) return;
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

  const MAX_WIDTH = 1000;

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-8">
        <SubTitle
          {...{
            txt: isCompleted
              ? `Your score is ${concept.userConcept!.score}%`
              : "Questions",
          }}
        />

        <ProgressBar
          {...{
            totSwaps: concept.questions.length,
            currSwap,
            maxW: MAX_WIDTH,
          }}
        />

        <ExternalTooltipErr
          {...{
            top: posParent[0],
            left: posParent[1],
            manualErr: errors?.quiz?.message,
            cssZ: 750,
          }}
        />

        <div
          ref={parentRef}
          className="mx-auto w-full border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-10 overflow-hidden transition-all duration-[0.4s]"
          css={css`
            /* general hypothetical hight of btns rows for all screens and font sizes */
            max-height: ${maxH + 200}px;
            max-width: ${MAX_WIDTH}px;
          `}
        >
          <motion.div
            className="grid gap-[10%]"
            css={css`
              max-width: ${questions.length * 100}%;
              align-items: start;
              grid-template-columns: repeat(${questions.length}, 100%);
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
            {questions.map((q, i) => (
              <QuestionItem
                key={q.id}
                {...{
                  currSwap,
                  outerIdx: i,
                  question: q,
                  stageSwap,
                  concept,
                }}
                ref={contentRef}
              />
            ))}
          </motion.div>

          <RowSwapBtns
            {...{
              currSwap,
              setCurrSwap,
              totSwaps: questions.length,
            }}
          />
        </div>

        <div className="w-[250px] justify-self-center">
          <BtnShadow
            {...{
              btnActType: BtnActType.SUCCESS,
              isEnabled: !isCompleted,
              label: "Send quiz",
              type: "submit",
              isLoading,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FooterConcept;
