/** @jsxImportSource @emotion/react */
"use client";

import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { getStrategicSliceState } from "../slices/slice";
import { isStr } from "@shared/first/lib/dataStructure.js";
import ColSide from "./ColSide";
import { ConceptType } from "@/features/concepts/types";

const SideConceptsList: FC = () => {
  const { currentCourseID, currentConceptID } = useSelector(
    getStrategicSliceState,
  );

  const hooks = conceptsSliceAPI.useLazyGetSideSummaryConceptsQuery();
  const [triggerRTK, res] = hooks;
  const { data: { concepts = [] } = {}, isLoading } = res;
  useWrapQuery({
    ...res,
    showToast: true,
  });

  useEffect(() => {
    if (isStr(currentCourseID))
      triggerRTK({
        courseID: currentCourseID,
      });
  }, [currentCourseID, triggerRTK]);

  const calcIsChosen = (el: Partial<ConceptType>) => el.id === currentConceptID;

  return (
    <ColSide
      {...{
        basePath: "concepts",
        isLoading,
        arg: concepts,
        calcIsChosen,
      }}
    />
  );
};

export default SideConceptsList;
