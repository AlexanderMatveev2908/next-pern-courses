/** @jsxImportSource @emotion/react */
"use client";

import CardShape from "@/common/components/cards/CardShape/CardShape";
import { ConceptType } from "@/features/concepts/types";
import {
  genLinksCard,
  genRowsInfoConcept,
} from "@/features/courses/uiFactory/cards";
import type { FC } from "react";
import LabelConcept from "./components/LabelConcept";
import ShowInfoRowsBackCard from "@/common/components/elements/ShowInfoRowsBackCard";

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
        ContentServer: (
          <ShowInfoRowsBackCard {...{ arg: genRowsInfoConcept(concept) }} />
        ),
        linksHref: genLinksCard(`/concepts/${concept.id}`),
      }}
    />
  );
};

export default ConceptItem;
