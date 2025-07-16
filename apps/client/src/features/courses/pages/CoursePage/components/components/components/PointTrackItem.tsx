/** @jsxImportSource @emotion/react */
"use client";

import ImgLoader from "@/common/components/HOC/assets/ImgLoader";
import Portal from "@/common/components/HOC/Portal";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import { ConceptType } from "@/features/concepts/types";
import { useMemo, useRef, useState, type FC } from "react";
import { css } from "@emotion/react";
import Tooltip from "@/common/components/elements/Tooltip";

type PropsType = {
  concept: ConceptType;
  currScroll: number;
};

const PointTrackItem: FC<PropsType> = ({ concept, currScroll }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  const optDep = useMemo(() => [currScroll], [currScroll]);

  const { posParent } = useGetPosPortal({
    contentRef,
    optDep,
  });

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={contentRef}
      className="w-[40px] h-[40px] rounded-full overflow-hidden z-60"
      css={css`
        justify-self: end;
      `}
    >
      <Portal>
        <div
          className="flex justify-center"
          css={css`
            position: absolute;
            top: ${posParent[0]}px;
            /* half of width established as minimum between  each track point + width of track point that is also container for image thumb inside */
            left: ${posParent[1] - 165}px;
            width: 250px;
            height: 80px;
            z-index: 3000;
            pointer-events: none;
          `}
        >
          <Tooltip
            {...{
              isHover,
              txt: concept.title,
            }}
          />
        </div>
      </Portal>

      <ImgLoader
        {...{
          src: concept.images[0].url,
        }}
      />
    </div>
  );
};

export default PointTrackItem;
