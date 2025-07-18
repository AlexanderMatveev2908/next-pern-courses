/** @jsxImportSource @emotion/react */
"use client";

import { type FC } from "react";
import ColSide from "./ColSide";
import { coursesSliceAPI } from "@/features/courses/slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { useCachedData } from "@/core/hooks/api/useCachedData";
import { getStrategicSliceState } from "../slices/slice";
import { useSelector } from "react-redux";
import { CourseType } from "@/features/courses/types/courses";

const CoursesSideList: FC = () => {
  const { currentCourseID } = useSelector(getStrategicSliceState);

  const { cachedData } = useCachedData({
    selector: coursesSliceAPI.endpoints.getCoursesSummary.select({
      courseID: "ee150b31-0bb1-4511-bda2-9078fb5d4efe",
    }),
  });

  const res = coursesSliceAPI.useGetCoursesSummaryQuery(
    { courseID: currentCourseID },
    {
      refetchOnMountOrArgChange: false,
    },
  );
  const {
    data: { courses } = {},
    isLoading: coursesLoading,
    isUninitialized: coursesInitialized,
  } = res;
  useWrapQuery({
    ...res,
    // showToast: true,
  });

  const coursesArg =
    (coursesInitialized && isArrOK(cachedData?.courses)
      ? cachedData?.courses
      : courses) ?? [];

  const findOutChosenCourse = (el: Partial<CourseType>) =>
    el?.id === currentCourseID;

  return (
    <ColSide
      {...{
        isLoading: coursesLoading,
        arg: coursesArg,
        basePath: "courses",
        calcIsChosen: findOutChosenCourse,
      }}
    />
  );
};

export default CoursesSideList;
