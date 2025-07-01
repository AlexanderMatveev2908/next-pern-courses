/** @jsxImportSource @emotion/react */
"use client";

import ImgLoader from "@/common/components/HOC/ImgLoader";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { css } from "@emotion/react";
import { isArrOK, isStr } from "@shared/first/lib/dataStructure";
import type { FC } from "react";

type PropsType = {
  images?: File[] | string[];
};

const PreviewImages: FC<PropsType> = ({ images }) => {
  const { ids } = useGenIDs({ lengths: [images?.length] });

  const isData = isArrOK(
    images as unknown as (string | File)[],
    (val) => isStr(val as string) || val instanceof File
  );

  return (
    <div
      className="w-full max-w-fit border-2 border-neutral-800 rounded-xl overflow-x-auto flex gap-8 snap-x snap-mandatory"
      css={css`
        padding: ${isData ? "30px" : "0px"};
      `}
    >
      {isData &&
        images!.map((el, i) => (
          <div
            key={ids[0][i]}
            className="min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px] snap-center"
          >
            <ImgLoader
              src={typeof el === "string" ? el : URL.createObjectURL(el)}
            />
          </div>
        ))}
    </div>
  );
};

export default PreviewImages;
