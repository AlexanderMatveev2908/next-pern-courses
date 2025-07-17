/** @jsxImportSource @emotion/react */
"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import type { FC } from "react";
import { coursesSliceAPI } from "../../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import PageItemShape from "@/common/components/cards/PageItemShape/PageItemShape";
import HeaderCourse from "./components/HeaderCourse";
import ConceptsList from "../../../concepts/components/ConceptsList/ConceptsList";
import RowInfoPage from "@/common/components/cards/fragments/page/RowInfoPage";
import { genRowsInfoCourse } from "../../uiFactory/cards";
import { css } from "@emotion/react";
import { __cg } from "@shared/first/lib/logger.js";

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

  // ! THE MAIN GOAL OF WRITING THE WRAPPER AS HOC THAT ACCEPT CB THAT
  // ! RETURN NODE IS THAT THIS WAY I CAN DELEGATE LOADING AND SUCCESS STATUS TO
  // ! A PARENT THAT NOT ONLY RENDER CONDITIONALLY THE REACT.NODE BUT BEING A
  // ! FUNCTION IT ALSO CALL IT CONDITIONALLY SO I CAN ACCESS PROPERTIES THAT
  // ! WOULD BE UNDEFINED AT RUNTIME BUT CODE WILL BE EVALUATED BY REACT JUST
  // ! AFTER FUNCTION IS ALLOWED BY BY PARENT TO BE CALLED

  return (
    <WrapPendingClient
      {...{
        waitHydration: true,
        isLoading,
        isSuccess: isObjOK(course),
        $genCustomCSS: (isSpinning) => {
          __cg("spin", isSpinning);

          return css`
            padding-left: ${isSpinning ? "0" : "60px"};
          `;
        },
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
              <RowInfoPage
                {...{
                  arg: genRowsInfoCourse(course!),
                }}
              />
            ),
            Footer: <ConceptsList {...{ concepts: course?.concepts }} />,
          }}
        />
      )}
    </WrapPendingClient>
  );
};

export default CoursePage;
