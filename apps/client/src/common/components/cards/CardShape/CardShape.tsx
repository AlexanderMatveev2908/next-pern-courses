/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import { useEffect, useRef, useState, type FC } from "react";
import { easeInOut, motion } from "framer-motion";
import { CardShapeStyled } from "./Styled";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import { css } from "@emotion/react";
import { __cg } from "@shared/first/lib/logger.js";
import ImgLoader from "../../HOC/assets/ImgLoader";

type PropsType = {
  images: CloudAssetType[];
  title: string;
};

const CardShape: FC<PropsType> = ({ images, title }) => {
  const [isHover, setIsHover] = useState(false);
  const [contentH, setContentH] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { isHydrated } = useListenHydration();

  useEffect(() => {
    if (!isHydrated) return;

    const el = contentRef.current;

    if (!el) {
      __cg("stage 1 — el is null");
      return;
    }

    const cb = () => setContentH(el.scrollHeight + 20 * 2);

    cb();

    const obs = new ResizeObserver(cb);
    obs.observe(el);

    window.addEventListener("resize", cb);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", cb);
    };
  }, [isHydrated]);

  return !isHydrated ? (
    <div className="skeleton w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl max-w-[350px] h-[300px] relative"></div>
  ) : (
    <CardShapeStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => window?.innerWidth > 600 && setIsHover(!isHover)}
      className="w-full max-w-[350px] border-[3px] border-neutral-800 p-5 rounded-xl relative"
      css={css`
        height: ${contentH}px;
        max-height: ${contentH}px;
        min-height: ${contentH}px;
      `}
    >
      <motion.div
        initial={{ rotateY: 0 }}
        transition={{
          duration: 0.5,
          ease: easeInOut,
        }}
        animate={{
          rotateY: isHover ? 180 : 0,
        }}
        className="flipper"
      >
        <div ref={contentRef} className="client">
          <div className="w-full flex justify-center bg-[#000] py-2 px-4 rounded-xl border-2 border-neutral-600">
            <span
              className="txt__lg grad__txt clamp__txt"
              style={{
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </span>
          </div>

          <div className="w-[300px] h-[300px]">
            <ImgLoader
              {...{
                src: images[0].url,
              }}
            />
          </div>
        </div>
        <div className="server">
          tenetur debitis voluptate eius expedita tempore molestias quidem iusto
          veniam ea! Illo alias est blanditiis repudiandae similique ipsum quos
          excepturi.
        </div>
      </motion.div>
    </CardShapeStyled>
  );
};

export default CardShape;
