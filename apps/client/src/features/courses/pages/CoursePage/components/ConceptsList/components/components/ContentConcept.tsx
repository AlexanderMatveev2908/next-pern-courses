/** @jsxImportSource @emotion/react */
"use client";

import { ConceptType } from "@/features/concepts/types";
import type { FC } from "react";

type PropsType = {
  concept: ConceptType;
};

const ContentConcept: FC<PropsType> = ({ concept }) => {
  return <div></div>;
};

export default ContentConcept;
