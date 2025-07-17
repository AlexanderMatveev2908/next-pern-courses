/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, type FC } from "react";
import ColSide from "../ColSide";
import SideCourseItem from "./components/SideCourseItem";
import { coursesSliceAPI } from "@/features/courses/slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { useCachedData } from "@/core/hooks/api/useCachedData";
import { getStrategicSliceState } from "../../slices/slice";
import { useSelector } from "react-redux";

const CoursesSideList: FC = () => {
  const { currentCourseID } = useSelector(getStrategicSliceState);

  const { cachedData } = useCachedData({
    selector: coursesSliceAPI.endpoints.getCoursesSummary.select({
      courseID: "ee150b31-0bb1-4511-bda2-9078fb5d4efe",
    }),
  });

  const hook = coursesSliceAPI.useLazyGetCoursesSummaryQuery();
  const [triggerRTK, res] = hook;
  const {
    data: { courses } = {},
    isLoading: coursesLoading,
    isUninitialized: coursesInitialized,
  } = res;
  useWrapQuery({
    ...res,
    showToast: true,
  });

  const coursesArg =
    (coursesInitialized && isArrOK(cachedData?.courses)
      ? cachedData?.courses
      : courses) ?? [];

  const findOutChosenCourse = (id: string) => id === currentCourseID;

  useEffect(() => {
    triggerRTK({});
  }, [triggerRTK]);

  return (
    <ColSide
      {...{
        isLoading: coursesLoading,
      }}
    >
      <div className="w-full grid grid-cols-1 gap-4">
        {coursesArg.map((el) => (
          <SideCourseItem
            key={el.id}
            {...{ el, isChosen: findOutChosenCourse(el.id!) }}
          />
        ))}
      </div>
    </ColSide>
  );
};

export default CoursesSideList;
