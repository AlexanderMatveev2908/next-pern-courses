/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { coursesSliceAPI } from "../../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isObjOK } from "@shared/first/lib/dataStructure.js";

type PropsType = {
  courseID: string;
};

const CoursePage: FC<PropsType> = ({ courseID }) => {
  const res = coursesSliceAPI.useGetCourseByIDQuery(courseID);
  const { isLoading, data: { course } = {} } = res;
  useWrapQuery({
    ...res,
    showToast: true,
    throwErr: true,
  });

  return (
    // ! THE MAIN GOAL OF WRITING THE WRAPPER AS HOC THAT ACCEPT CB THAT RETURN NODE IS THAT THIS WAY I CAN DELEGATE LOADING AND SUCCESS STATUS TO A PARENT THAT NOT ONLY RENDER CONDITIONALLY THE REACT.NODE BUT BEING A FUNCTION IT ALSO CALL IT CONDITIONALLY SO I CAN ACCESS PROPERTIES THAT WOULD BE UNDEFINED AT RUNTIME BUT CODE WILL BE EVALUATED BY REACT JUST AFTER FUNCTION IS ALLOWED BY BY PARENT TO BE CALLED
    <WrapPendingClient
      {...{
        waitHydration: true,
        isLoading,
        isSuccess: isObjOK(course),
      }}
    >
      {() => (
        <div className="w-full grid grid-cols-1 gap-10">
          <div className="w-full flex justify-center">
            <span className="txt__xl grad__txt">
              {course!.title.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </WrapPendingClient>
  );
};

export default CoursePage;
