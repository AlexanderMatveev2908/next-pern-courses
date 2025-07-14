/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import CardShape from "@/common/components/cards/CardShape/CardShape";
import LabelCourse from "./components/LabelCourse";
import { genLinksCard, genRowsInfoCourse } from "../../../uiFactory/cards";
import { CourseType } from "@/features/courses/types/courses";
import ShowInfoRowsBackCard from "@/common/components/elements/ShowInfoRowsBackCard";

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
        ContentServer: (
          <ShowInfoRowsBackCard {...{ arg: genRowsInfoCourse(course) }} />
        ),
        linksHref: genLinksCard(`/courses/${course.id}`),
      }}
    />
  );
};

export default CourseItem;
