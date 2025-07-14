/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import CardShape from "@/common/components/cards/CardShape/CardShape";
import { genLinksCard, genRowsInfoCourse } from "../../../uiFactory/cards";
import { CourseType } from "@/features/courses/types/courses";
import ShowInfoRowsBackCard from "@/common/components/cards/fragments/ShowInfoRowsBackCard";
import LabelCard from "@/common/components/cards/fragments/LabelCard";
import { difficultiesAssets } from "@/core/uiFactory/style";

type PropsType = {
  course: CourseType;
};

const CourseItem: FC<PropsType> = ({ course }) => {
  const { images } = course;

  const Svg =
    difficultiesAssets[course.grade as keyof typeof difficultiesAssets].Svg;
  const $clr =
    difficultiesAssets[course.grade as keyof typeof difficultiesAssets].clr;

  return (
    <CardShape
      {...{
        images,
        Label: (
          <LabelCard {...{ txt: course.title, $clr, $borderClr: $clr, Svg }} />
        ),
        ContentServer: (
          <ShowInfoRowsBackCard {...{ arg: genRowsInfoCourse(course) }} />
        ),
        linksHref: genLinksCard(`/courses/${course.id}`),
      }}
    />
  );
};

export default CourseItem;
