/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { coursesSliceAPI } from "../../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";

type PropsType = {
  courseID: string;
};

const CoursePage: FC<PropsType> = ({ courseID }) => {
  const res = coursesSliceAPI.useGetCourseByIDQuery(courseID);
  const { isLoading } = res;
  useWrapQuery({
    ...res,
    showToast: true,
    throwErr: true,
  });

  return (
    <WrapPendingClient
      {...{
        waitHydration: true,
        isLoading,
      }}
    >
      {() => <div className=""></div>}
    </WrapPendingClient>
  );
};

export default CoursePage;
