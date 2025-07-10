/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import { useEffect, useRef, useState, type FC } from "react";
import { easeInOut, motion } from "framer-motion";
import { CardShapeStyled } from "./Styled";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import { __cg } from "@shared/first/lib/logger.js";
import ImgLoader from "../../HOC/assets/ImgLoader";
import Shim from "../../elements/Shim";
import { css } from "@emotion/react";
import LinkShadow from "../../buttons/LinkShadow";

type PropsType = {
  images: CloudAssetType[];
  Label: React.ReactNode;
  ContentServer: React.ReactNode;
  linksHref: { href: string; id: string }[];
};

const CardShape: FC<PropsType> = ({
  images,
  Label,
  ContentServer,
  linksHref,
}) => {
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
    <Shim
      {...{
        $CSS: {
          css: css`
            width: 350px;
            height: 425px;
          `,
        },
      }}
    />
  ) : (
    <CardShapeStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      // onClick={() => window?.innerWidth > 600 && setIsHover(!isHover)}
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
          {Label}

          <div className="w-[300px] h-[300px]">
            <ImgLoader
              {...{
                src: images[0].url,
              }}
            />
          </div>
        </div>
        <div className="server">
          {ContentServer}

          <div className="w-full grid grid-cols-1 gap-6 mt-4">
            <div className="w-full justify-self-center max-w-[250px]">
              {linksHref.map((el, i) => (
                <LinkShadow
                  key={el.id}
                  {...{
                    label: !i ? "View more" : "👻",
                    href: el.href,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </CardShapeStyled>
  );
};

export default CardShape;
