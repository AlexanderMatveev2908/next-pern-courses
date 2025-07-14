/** @jsxImportSource @emotion/react */
"use client";

import CardShape from "@/common/components/cards/CardShape/CardShape";
import { ConceptType } from "@/features/concepts/types";
import { genLinksCard } from "@/features/courses/uiFactory/cards";
import type { FC } from "react";
import LabelConcept from "./components/LabelConcept";
import ContentConcept from "./components/ContentConcept";

type PropsType = {
  concept: ConceptType;
};

const ConceptItem: FC<PropsType> = ({ concept }) => {
  const { images } = concept;

  return (
    <CardShape
      {...{
        images,
        Label: <LabelConcept {...{ concept }} />,
        ContentServer: <ContentConcept {...{ concept }} />,
        linksHref: genLinksCard(`/concepts/${concept.id}`),
      }}
    />
  );
};

export default ConceptItem;
