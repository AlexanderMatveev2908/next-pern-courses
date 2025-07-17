/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, type FC } from "react";
import { ConceptType } from "../../types";
import PageItemShape from "@/common/components/cards/PageItemShape/PageItemShape";
import HeaderConcept from "./components/HeaderConcept";
import FooterConcept from "./components/FooterConcept/FooterConcept";
import RowInfoPage from "@/common/components/cards/fragments/page/RowInfoPage";
import { genInfoConceptPage } from "./uiFactory";
import { useDispatch } from "react-redux";
import { strategicSlice } from "@/features/layout/components/StrategicSidebar/slices/slice";
import { isStr } from "@shared/first/lib/dataStructure.js";

type PropsType = {
  concept: ConceptType;
};

const ConceptPage: FC<PropsType> = ({ concept }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStr(concept.courseID))
      dispatch(strategicSlice.actions.setCurrCourseID(concept.courseID));
  }, [concept, dispatch]);

  return (
    <PageItemShape
      {...{
        images: concept!.images,
        title: concept!.title,
        video: concept?.video,
        description: concept?.description,
        markdown: concept!.markdown,
        Header: <HeaderConcept {...{ refs: concept.refs }} />,
        Content: <RowInfoPage {...{ arg: genInfoConceptPage(concept) }} />,
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
