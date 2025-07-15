/** @jsxImportSource @emotion/react */
"use client";

import { ConceptType } from "@/features/concepts/types";
import type { FC } from "react";
import { css } from "@emotion/react";
import { CircleCheckBig } from "lucide-react";

type PropsType = {
  concept: ConceptType;
};

const FooterImgConcept: FC<PropsType> = ({ concept }) => {
  return (
    concept.isCompleted && (
      <div
        css={css`
          border: 2px solid var(--neutral__800);
          position: absolute;
          bottom: 0;
          left: 0;
          min-width: 100%;
          height: 50px;
          background: var(--neutral__950);
          padding: 5px 20px;
        `}
      >
        <div className="w-full h-full flex items-center gap-6">
          <CircleCheckBig className="text-green-600 min-w-[30px] min-h-[30px]" />

          <span className="txt__md text-neutral-300">Completed</span>
        </div>
      </div>
    )
  );
};

export default FooterImgConcept;
