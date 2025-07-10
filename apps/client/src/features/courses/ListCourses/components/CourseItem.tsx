/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { CourseType } from "../../types/courses";
import CardShape from "@/common/components/cards/CardShape/CardShape";
import LabelCourse from "./components/LabelCourse";

type PropsType = {
  course: CourseType;
};

const CourseItem: FC<PropsType> = ({ course }) => {
  const { images } = course;

  return (
    <CardShape
      {...{ images, Label: <LabelCourse {...{ course }} /> }}
    ></CardShape>
  );
};

export default CourseItem;
