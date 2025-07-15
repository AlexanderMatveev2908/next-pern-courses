/** @jsxImportSource @emotion/react */
"use client";

import { CourseType } from "@/features/courses/types/courses";
import { __cg } from "@shared/first/lib/logger.js";
import type { FC } from "react";

type PropsType = {
  course: CourseType;
};

const SpecialProgress: FC<PropsType> = ({ course }) => {
  const { concepts = [] } = course;
  const completedCount = concepts.filter((cpt) => cpt.isCompleted).length;
  const perc = (completedCount / concepts.length) * 100;
  __cg("perc", perc);

  return (
    <div className="w-full border-[3px] border-neutral-800 h-[50px] rounded-full"></div>
  );
};

export default SpecialProgress;
