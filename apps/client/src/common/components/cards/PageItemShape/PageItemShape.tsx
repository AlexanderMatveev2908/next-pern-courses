/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import type { FC } from "react";
import ImagesSwapper from "../../HOC/ImagesSwapper/ImagesSwapper";
import VideoLoader from "../../HOC/assets/VideoLoader";
import { css } from "@emotion/react";
import { isStr } from "@shared/first/lib/dataStructure.js";

type PropsType = {
  title: string;
  images: CloudAssetType[];
  video?: CloudAssetType | null;
};

const PageItemShape: FC<PropsType> = ({ images, video, title }) => {
  return (
    <div
      className="w-full grid grid-cols-1 gap-10"
      css={css`
        margin-bottom: ${isStr(video?.url) ? -100 : 0}px;
      `}
    >
      <div className="w-full flex justify-center">
        <span className="txt__xl grad__txt">{title}</span>
      </div>

      <ImagesSwapper
        {...{
          urls: images.map((img) => img.url),
        }}
      />

      <div className="w-full aspect-[16/9] max-w-[800px] justify-self-center mt-[100px]">
        <VideoLoader
          {...{
            src: video?.url,
          }}
        />
      </div>
    </div>
  );
};

export default PageItemShape;
