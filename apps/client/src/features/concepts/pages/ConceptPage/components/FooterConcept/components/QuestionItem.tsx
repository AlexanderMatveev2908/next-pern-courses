/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import { genIpsum } from "@/core/lib/etc";
import { QuizType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { forwardRef } from "react";

type PropsType = {
  outerIdx: number;
  currSwap: number;
  question: QuizType;
};

const QuestionItem = forwardRef<HTMLDivElement, PropsType>(
  ({ currSwap, outerIdx, question }, contentRef) => {
    return (
      <div
        ref={outerIdx === currSwap ? contentRef : null}
        key={question.id}
        className="w-full h-fit p-3 grid grid-cols-1 gap-4 text-white"
        css={css`
          transition: 0.4s;
          opacity: ${outerIdx === currSwap ? 1 : 0};
          pointer-events: ${outerIdx === currSwap ? "all" : "none"};
        `}
      >
        <SubTitle
          {...{
            txt: question.title,
            $styleTwd: "txt__lg text-neutral-200",
          }}
        />

        <SubTitle
          {...{
            txt: question.question,
            $styleTwd: "txt__md text-neutral-300",
          }}
        />

        {outerIdx % 2 === 0 ? genIpsum(7) : 0}
        {/* <div className="w-full grid grid-cols-1 gap-4">
          {question.variants.map((vrt) => (
            <div key={vrt.id} className="w-full flex"></div>
          ))}
        </div> */}
      </div>
    );
  },
);

QuestionItem.displayName = "QuestionItem";

export default QuestionItem;
