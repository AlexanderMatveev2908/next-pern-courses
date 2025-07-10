/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import type { FC } from "react";
import ImgLoader from "../HOC/assets/ImgLoader";

type PropsType = {
  images: CloudAssetType[];
};

const ImagesScroll: FC<PropsType> = ({ images }) => {
  return (
    <div className="w-full flex scroll__app overflow-x-auto gap-10">
      {images.map((el) => (
        <div
          key={el.id}
          className="min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px]"
        >
          <ImgLoader
            {...{
              src: el.url,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesScroll;
