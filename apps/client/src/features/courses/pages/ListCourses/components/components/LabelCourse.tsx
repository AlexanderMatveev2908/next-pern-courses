/** @jsxImportSource @emotion/react */
"use client";

import { difficultiesAssets } from "@/core/uiFactory/style";
import { CourseType } from "@/features/courses/types/courses";
import type { FC } from "react";
import { css } from "@emotion/react";

type PropsType = {
  course: CourseType;
};

const LabelCourse: FC<PropsType> = ({ course }) => {
  const Svg =
    difficultiesAssets[course.grade as keyof typeof difficultiesAssets].Svg;
  const clr =
    difficultiesAssets[course.grade as keyof typeof difficultiesAssets].clr;

  return (
    <div
      className="w-full flex justify-start items-center gap-5 bg-[#000] py-2 px-4 rounded-xl border-2"
      css={css`
        border-color: ${clr};
        color: ${clr};
      `}
    >
      <div
        className="min-w-[35px] min-h-[35px] border-[3px] flex justify-center items-center  rounded-full"
        css={css`
          border-color: ${clr};
        `}
      >
        <Svg className="min-w-[25px]  min-h-[25px]" />
      </div>

      <span
        className="txt__lg  clamp__txt"
        style={{
          WebkitLineClamp: 2,
        }}
      >
        {course.title}
      </span>
    </div>
  );
};

export default LabelCourse;
