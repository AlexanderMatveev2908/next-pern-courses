/** @jsxImportSource @emotion/react */
"use client";

import { CourseType } from "@/features/courses/types/courses";
import { __cg } from "@shared/first/lib/logger.js";
import type { FC } from "react";
import { css } from "@emotion/react";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import PointTrackItem from "./components/PointTrackItem";

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
    <div className="w-full overflow-x-scroll pb-3 px-2">
      <div
        className="w-full max-w-fit border-[3px] border-neutral-800 h-[50px] rounded-full relative mx-auto"
        css={css`
          display: grid;
          grid-template-columns: repeat(${concepts.length}, 1fr);
          align-items: center;
          min-width: ${concepts.length * 250}px;
        `}
      >
        {concepts.map((cpt, i) => (
          <PointTrackItem key={ids[i]} {...{ concept: cpt }} />
        ))}

        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-neutral-200 rounded-tr-full rounded-br-full"
            css={css`
              width: ${perc}%;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProgress;
