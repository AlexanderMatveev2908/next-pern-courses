/** @jsxImportSource @emotion/react */
"use client";

import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { getStrategicSliceState } from "../../slices/slice";
import { isStr } from "@shared/first/lib/dataStructure.js";
import ColSide from "../ColSide";

const SideConceptsList: FC = () => {
  const { currentCourseID } = useSelector(getStrategicSliceState);

  const hooks = conceptsSliceAPI.useLazyGetSideSummaryConceptsQuery();
  const [triggerRTK, res] = hooks;
  const { data, isLoading, isUninitialized } = res;
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

  return <div className=""></div>;
};

export default SideConceptsList;
