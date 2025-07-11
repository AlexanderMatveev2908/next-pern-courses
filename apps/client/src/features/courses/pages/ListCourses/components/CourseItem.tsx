/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import CardShape from "@/common/components/cards/CardShape/CardShape";
import LabelCourse from "./components/LabelCourse";
import ContentCourse from "./components/ContentCourse/ContentCourse";
import { genLinksCard } from "../../../uiFactory/cards";
import { CourseType } from "@/features/courses/types/courses";

type PropsType = {
  course: CourseType;
};

const CourseItem: FC<PropsType> = ({ course }) => {
  const { images } = course;

  return (
    <CardShape
      {...{
        images,
        Label: <LabelCourse {...{ course }} />,
        ContentServer: <ContentCourse {...{ course }} />,
        linksHref: genLinksCard(`/courses/${course.id}`),
      }}
    />
  );
};

export default CourseItem;
