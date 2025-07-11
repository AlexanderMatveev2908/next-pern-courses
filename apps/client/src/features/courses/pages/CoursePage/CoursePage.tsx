/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { coursesSliceAPI } from "../../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import PageItemShape from "@/common/components/cards/PageItemShape/PageItemShape";
import ContentCourse from "./components/ContentCourse";
import HeaderCourse from "./components/HeaderCourse";

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
        <PageItemShape
          {...{
            images: course!.images,
            title: course!.title,
            video: course?.video,
            description: course?.description,
            markdown: course!.markdown,
            Header: <HeaderCourse {...{ course: course! }} />,
            Content: (
              <ContentCourse
                {...{
                  course: course!,
                }}
              />
            ),
          }}
        ></PageItemShape>
      )}
    </WrapPendingClient>
  );
};

export default CoursePage;
