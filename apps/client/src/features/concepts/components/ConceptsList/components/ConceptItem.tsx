/** @jsxImportSource @emotion/react */
"use client";

import CardShape from "@/common/components/cards/CardShape/CardShape";
import { ConceptType } from "@/features/concepts/types";
import { genLinksCard } from "@/features/courses/uiFactory/cards";
import type { FC } from "react";
import ShowInfoRowsBackCard from "@/common/components/cards/fragments/card/ShowInfoRowsBackCard";
import LabelCard from "@/common/components/cards/fragments/card/LabelCard";
import { genRowsInfoConcept } from "@/features/concepts/uiFactory";
import FooterImgConcept from "./components/FooterImgConcept";

type PropsType = {
  concept: ConceptType;
};

const ConceptItem: FC<PropsType> = ({ concept }) => {
  const { images } = concept;

  return (
    <CardShape
      {...{
        images,
        Label: <LabelCard {...{ txt: concept.title }} />,
        ContentServer: (
          <ShowInfoRowsBackCard {...{ arg: genRowsInfoConcept(concept) }} />
        ),
        FooterImg: <FooterImgConcept {...{ concept }} />,
        linksHref: genLinksCard(`/concepts/${concept.id}`),
      }}
    />
  );
};

export default ConceptItem;
