/** @jsxImportSource @emotion/react */
"use client";

import { CourseType } from "@/features/courses/types/courses";
import { __cg } from "@shared/first/lib/logger.js";
import type { FC } from "react";
import { css } from "@emotion/react";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import ImgLoader from "@/common/components/HOC/assets/ImgLoader";

type PropsType = {
  course: CourseType;
};

const SpecialProgress: FC<PropsType> = ({ course }) => {
  const { concepts = [] } = course;
  const completedCount = concepts.filter((cpt) => cpt.isCompleted).length;
  const perc = (completedCount / concepts.length) * 100;

  __cg("perc", perc);

  const {
    ids: [ids],
  } = useGenIDsV2({
    lengths: [concepts.length],
  });

  __cg("cpts", concepts);

  return (
    <div
      className="w-full border-[3px] border-neutral-800 h-[50px] rounded-full relative"
      css={css`
        display: grid;
        grid-template-columns: repeat(${concepts.length}, 1fr);
        align-items: center;
      `}
    >
      {concepts.map((cpt, i, arg) => (
        <div
          key={ids[i]}
          className="w-[40px] h-[40px] rounded-full overflow-hidden z-60"
          css={css`
            justify-self: end;
          `}
        >
          <ImgLoader
            {...{
              src: cpt.images[0].url,
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-neutral-200"
          css={css`
            width: ${perc}%;
          `}
        ></div>
      </div>
    </div>
  );
};

export default SpecialProgress;
