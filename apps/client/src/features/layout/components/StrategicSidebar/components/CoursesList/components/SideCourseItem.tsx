/** @jsxImportSource @emotion/react */
"use client";

import ImgLoader from "@/common/components/HOC/assets/ImgLoader";
import { CourseType } from "@/features/courses/types/courses";
import Link from "next/link";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import { strategicSlice } from "../../../slices/slice";

type PropsType = {
  el: Partial<CourseType>;
  isChosen?: boolean;
};

const SideCourseItem: FC<PropsType> = ({ el, isChosen }) => {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(strategicSlice.actions.setSide(false))}
      href={`/courses/${el.id}`}
      className={`w-full flex items-center gap-5 transition-all duration-300 py-2 px-3 rounded-xl cursor-pointer group   hover:bg-neutral-200 ${isChosen ? "bg-neutral-200" : ""}`}
    >
      <div className="min-w-[40px] w-[40px] h-[40px] min-h-[40px] relative">
        <ImgLoader
          {...{
            src: el?.images?.[0]?.url,
          }}
        />
      </div>

      <span
        className={`txt__lg clamp__txt transition-all duration-300 group-hover:text-neutral-950 ${isChosen ? "text-neutral-950" : "text-neutral-200"}`}
        style={{
          WebkitLineClamp: 3,
        }}
      >
        {el.title}
      </span>
    </Link>
  );
};

export default SideCourseItem;
