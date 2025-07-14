/** @jsxImportSource @emotion/react */
"use client";

import { ConceptType } from "@/features/concepts/types";
import type { FC } from "react";

type PropsType = {
  concept: ConceptType;
};

const LabelConcept: FC<PropsType> = ({ concept }) => {
  return (
    <div
      className="w-full flex justify-start items-center gap-5 bg-[#000] py-2 px-4 rounded-xl border-2
      border-neutral-800 text-neutral-200"
    >
      <span
        className="txt__lg  clamp__txt"
        style={{
          WebkitLineClamp: 2,
        }}
      >
        {concept.title}
      </span>
    </div>
  );
};

export default LabelConcept;
