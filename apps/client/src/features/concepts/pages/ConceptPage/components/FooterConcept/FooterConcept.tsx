/** @jsxImportSource @emotion/react */
"use client";

import SubTitle from "@/common/components/elements/SubTitle";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";
import { ConceptType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { useState, type FC } from "react";
import { motion } from "framer-motion";

type PropsType = {
  concept: ConceptType;
};

const FooterConcept: FC<PropsType> = ({ concept: { quizzes } }) => {
  const [currSwap, setCurrSwap] = useState(0);

  return (
    <div className="w-full grid grid-cols-1 gap-8">
      <SubTitle {...{ txt: "Quizzes" }} />

      <div className="w-full max-w-[800px] border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-10 overflow-x-hidden">
        <motion.div
          className="grid gap-[10%]"
          css={css`
            max-width: ${quizzes.length * 100}%;
            grid-template-columns: repeat(${quizzes.length}, 100%);
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
            <div
              key={q.id}
              className="text-neutral-200 min-w-full border-2 border-neutral-600"
              css={css`
                transition: 0.4s;
                opacity: ${i === currSwap ? 1 : 0};
              `}
            >
              {q.id}
            </div>
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
  );
};

export default FooterConcept;
