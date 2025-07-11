/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import ImgLoader from "../assets/ImgLoader";
import { genSizeCSS, getImgParSwap, grabImgWSlider } from "./uiFactory";
import { css } from "@emotion/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { resp } from "@/core/lib/style";
import { StyledContainer } from "./Styled";
import { __cg } from "@shared/first/lib/logger.js";
import { easeInOut, motion } from "framer-motion";

type PropsType = {
  urls: string[];
};

const ImagesSwapper: FC<PropsType> = ({ urls }) => {
  const [currSLide, setCurrSLide] = useState(0);
  const [imgW, setImgW] = useState(grabImgWSlider());
  const timerID = useRef<NodeJS.Timeout | null>(null);
  const [imgPerSwap, setImgPerSwap] = useState(getImgParSwap());

  const maxSwapsPossible = useMemo(
    () => Math.ceil(urls.length / imgPerSwap),
    [urls, imgPerSwap],
  );

  const calcRange = (i: number) => {
    const start = currSLide * imgPerSwap;
    const end = (currSLide + 1) * imgPerSwap;

    __cg("range", start, end);

    return i >= start && i < end;
  };

  useEffect(() => {
    const listen = () => {
      setImgW(grabImgWSlider());
      setImgPerSwap(getImgParSwap());

      if (currSLide >= maxSwapsPossible) setCurrSLide(maxSwapsPossible - 1);
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [currSLide, maxSwapsPossible]);

  const { ids } = useGenIDs({
    lengths: [urls.length],
  });

  const handleClick = (dir: "-" | "+") =>
    setCurrSLide((prev) => prev + (dir === "+" ? 1 : -1));

  return (
    <StyledContainer
      className="flex relative justify-self-center border-[3px] border-neutral-600 rounded-xl py-3"
      css={css`
        width: fit-content;
        max-width: ${imgW * imgPerSwap + imgPerSwap * 30}px;
      `}
    >
      <button
        disabled={currSLide <= 0}
        onClick={handleClick.bind(null, "-")}
        className="btn -left-[40px]"
      >
        <FaAngleLeft />
      </button>

      <div className="w-full max-w-full overflow-x-hidden">
        <motion.div
          initial={{
            x: 0,
          }}
          transition={{
            duration: 0.3,
            ease: easeInOut,
          }}
          className="w-full flex"
          animate={{
            x: -currSLide * imgW * imgPerSwap - currSLide * 20 * imgPerSwap,
          }}
        >
          {urls.map((url, i) => (
            <div
              key={ids[0][i]}
              className="mx-[10px] transition-all duration-300"
              css={css`
                ${genSizeCSS(imgW)}
                opacity: ${calcRange(i) ? 1 : 0};
              `}
            >
              <ImgLoader {...{ src: url }} />
            </div>
          ))}
        </motion.div>
      </div>

      <button
        disabled={currSLide >= Math.ceil(urls.length / imgPerSwap) - 1}
        onClick={handleClick.bind(null, "+")}
        className="btn -right-[40px]"
      >
        <FaAngleRight />
      </button>
    </StyledContainer>
  );
};

export default ImagesSwapper;
