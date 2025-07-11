/** @jsxImportSource @emotion/react */
"use client";

import RowInfo from "@/common/components/elements/RowInfo";
import SubTitle from "@/common/components/elements/SubTitle";
import { useGenIDsV2 } from "@/core/hooks/ui/useGenIDsV2";
import { CourseType } from "@/features/courses/types/courses";
import { genRowsInfo } from "@/features/courses/uiFactory/cards";
import { css } from "@emotion/react";
import type { FC } from "react";

type PropsType = {
  course: CourseType;
};

const ContentCourse: FC<PropsType> = ({ course }) => {
  const { ids } = useGenIDsV2({
    lengths: [5],
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <SubTitle
        {...{
          txt: "Info",
        }}
      />

      <div
        className="w-full grid gap-6"
        css={css`
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        `}
      >
        {genRowsInfo(course).map((el, i) => (
          <div key={ids[0][i]} className="w-full">
            <RowInfo
              {...{
                info: el,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCourse;
