/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import CardShape from "@/common/components/cards/CardShape/CardShape";
import { genLinksCard, genRowsInfoCourse } from "../../../uiFactory/cards";
import { CourseType } from "@/features/courses/types/courses";
import ShowInfoRowsBackCard from "@/common/components/cards/fragments/card/ShowInfoRowsBackCard";
import LabelCard from "@/common/components/cards/fragments/card/LabelCard";
import { difficultiesAssets } from "@/core/uiFactory/style";
import CompletedRowMark from "@/common/components/elements/CompletedRowMark";

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
        FooterImg: course.isCompleted && <CompletedRowMark />,
        linksHref: genLinksCard(`/courses/${course.id}`),
      }}
    />
  );
};

export default CourseItem;
