/** @jsxImportSource @emotion/react */
"use client";

import ImgLoader from "@/common/components/HOC/assets/ImgLoader";
import Portal from "@/common/components/HOC/Portal";
import { useGetPosPortal } from "@/core/hooks/ui/useGetPosPortal";
import { ConceptType } from "@/features/concepts/types";
import { useMemo, useRef, useState, type FC } from "react";
import Tooltip from "@/common/components/elements/Tooltip";
import Link from "next/link";
import { css } from "@emotion/react";

type PropsType = {
  concept: ConceptType;
  currScroll: number;
  isCurrLastCompleted: boolean;
};

const PointTrackItem: FC<PropsType> = ({
  concept,
  currScroll,
  isCurrLastCompleted,
}) => {
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
      className={`rounded-full overflow-hidden z-60 ${
        isCurrLastCompleted ? "w-[60px] h-[60px]" : "w-[40px] h-[40px]"
      }`}
      css={css`
        justify-self: end;
        align-self: center;
      `}
    >
      <Portal>
        <div
          className="flex justify-center"
          css={css`
            position: absolute;
            top: ${posParent[0]}px;
            /* half of width established as minimum between  each track point + width of track point that is also container for image thumb inside */
            left: ${posParent[1] - 75 - 20}px;
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
              $triangleCSS: css`
                right: 50%;
                transform: translateX(50%);
              `,
            }}
          />
        </div>
      </Portal>

      <Link href={`/concepts/${concept.id}`}>
        <ImgLoader
          {...{
            src: concept.images[0].url,
          }}
        />
      </Link>
    </div>
  );
};

export default PointTrackItem;
