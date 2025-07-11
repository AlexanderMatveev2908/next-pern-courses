/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import type { FC } from "react";
import ImagesSwapper from "../../HOC/ImagesSwapper/ImagesSwapper";

type PropsType = {
  title: string;
  images: CloudAssetType[];
};

const PageItemShape: FC<PropsType> = ({ images, title }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <div className="w-full flex justify-center">
        <span className="txt__xl grad__txt">{title}</span>
      </div>

      <ImagesSwapper
        {...{
          urls: images.map((img) => img.url),
        }}
      />
    </div>
  );
};

export default PageItemShape;
