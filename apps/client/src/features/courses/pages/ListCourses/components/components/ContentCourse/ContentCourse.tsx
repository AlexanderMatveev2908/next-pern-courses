/** @jsxImportSource @emotion/react */
"use client";

import { CourseType } from "@/features/courses/types/courses";
import { type FC } from "react";
import { genRowsInfo } from "../../../../../uiFactory/cards";
import RowInfo from "../../../../../../../common/components/elements/RowInfo";

type PropsType = {
  course: CourseType;
};

const ContentCourse: FC<PropsType> = ({ course }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {genRowsInfo(course).map((el) => (
        <RowInfo key={el.id} {...{ info: el }} />
      ))}
    </div>
  );
};

export default ContentCourse;
