/** @jsxImportSource @emotion/react */
"use client";

import VideoLoader from "@/common/components/HOC/assets/VideoLoader";
import { css } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure";
import type { FC } from "react";

type PropsType = {
  vid?: string | File;
};

const PreviewVideo: FC<PropsType> = ({ vid }) => {
  const isData = isStr(vid as string) || (vid as File) instanceof File;

  return (
    <div
      className="w-full flex aspect-ratio-[16/9] max-w-[600px]"
      css={css`
        margin-top: ${isData ? "1rem" : "0px"};
      `}
    >
      {isData && (
        <VideoLoader
          {...{
            src: (isStr(vid as string)
              ? vid
              : URL.createObjectURL(vid as File)) as string,
          }}
        />
      )}
    </div>
  );
};

export default PreviewVideo;
