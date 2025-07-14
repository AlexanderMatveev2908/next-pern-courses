/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { ConceptType } from "../../types";
import PageItemShape from "@/common/components/cards/PageItemShape/PageItemShape";
import HeaderConcept from "./components/HeaderConcept";
import FooterConcept from "./components/FooterConcept/FooterConcept";

type PropsType = {
  concept: ConceptType;
};

const ConceptPage: FC<PropsType> = ({ concept }) => {
  return (
    <PageItemShape
      {...{
        images: concept!.images,
        title: concept!.title,
        video: concept?.video,
        description: concept?.description,
        markdown: concept!.markdown,
        Header: <HeaderConcept {...{ refs: concept.refs }} />,
        Footer: (
          <FooterConcept
            {...{
              concept,
            }}
          />
        ),
      }}
    />
  );
};

export default ConceptPage;
