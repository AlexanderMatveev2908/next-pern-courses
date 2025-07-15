/** @jsxImportSource @emotion/react */
"use client";

import DropMenu from "@/common/components/dropMenu/DropMenu";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import { CourseType } from "@/features/courses/types/courses";
import { linkCourseActions } from "@/features/courses/uiFactory/cards";
import Link from "next/link";
import type { FC } from "react";
import { FaGear } from "react-icons/fa6";
import SpecialProgress from "./components/SpecialProgress";

type PropsType = {
  course: CourseType;
};

const HeaderCourse: FC<PropsType> = ({ course }) => {
  const { ids } = useGenIDsV2({
    lengths: [1],
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <SpecialProgress
        {...{
          course,
        }}
      />
      <div className="w-full flex justify-end">
        <div className="w-[300px]">
          <DropMenu
            {...{
              el: {
                label: "Actions",
                svg: FaGear,
              },
            }}
          >
            {() =>
              linkCourseActions(course.id).map((el, i) => (
                <Link href={el.href} key={ids[0][i]} className="li__drop">
                  <span className="txt__lg">{el.label}</span>
                </Link>
              ))
            }
          </DropMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderCourse;
