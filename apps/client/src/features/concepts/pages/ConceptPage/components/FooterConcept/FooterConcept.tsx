/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";
import { ConceptType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useQuiz } from "./reducer/useQuiz";
import { FC, useMemo } from "react";
import { useResizeElementHeight } from "@/core/hooks/ui/useResizeElementHeight";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormQuizType,
  schemaQuiz,
} from "@shared/first/paperwork/concepts/schema.quiz.js";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionItem from "./components/QuestionItem";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType = {
  concept: ConceptType;
};

const FooterConcept: FC<PropsType> = ({ concept: { quizzes } }) => {
  const { currSwap, maxH, setCurrSwap, contentRef, setMaxH } = useQuiz();

  const optionalDep = useMemo(() => [currSwap], [currSwap]);
  useResizeElementHeight({
    contentRef,
    setMaxH,
    optionalDep,
  });

  const formCtx = useForm<FormQuizType>({
    resolver: zodResolver(schemaQuiz),
    mode: "onChange",
  });

  __cg("vls", formCtx.watch());

  return (
    <FormProvider {...formCtx}>
      <div className="w-full grid grid-cols-1 gap-8">
        <SubTitle {...{ txt: "Questions" }} />

        <div
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
      </div>
    </FormProvider>
  );
};

export default FooterConcept;
