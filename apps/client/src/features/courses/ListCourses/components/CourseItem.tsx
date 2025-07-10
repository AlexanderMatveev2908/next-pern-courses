/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import { CourseType } from "../../types/courses";
import CardShape from "@/common/components/cards/CardShape/CardShape";

type PropsType = {
  course: CourseType;
};

const CourseItem: FC<PropsType> = ({ course }) => {
  const { images, title } = course;

  return <CardShape {...{ images, title }}></CardShape>;
};

export default CourseItem;
