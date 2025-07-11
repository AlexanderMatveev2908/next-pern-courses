/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { useEffect, useRef, useState, type FC } from "react";
import ImgLoader from "../assets/ImgLoader";
import { genSizeCSS, getImgParSwap, grabImgWSlider } from "./uiFactory";
import { css } from "@emotion/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { resp } from "@/core/lib/style";
import { StyledContainer } from "./Styled";
import { __cg } from "@shared/first/lib/logger.js";

type PropsType = {
  urls: string[];
};

const ImagesSwapper: FC<PropsType> = ({ urls }) => {
  const [currSLide, setCurrSLide] = useState(0);
  const [imgW, setImgW] = useState(grabImgWSlider());
  const timerID = useRef<NodeJS.Timeout | null>(null);
  const [imgPerSwap, setImgPerSwap] = useState(getImgParSwap());

  useEffect(() => {
    const listen = () => {
      setImgW(grabImgWSlider());
      setImgPerSwap(getImgParSwap());
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  const { ids } = useGenIDs({
    lengths: [urls.length],
  });

  return (
    <StyledContainer
      className="w-full flex justify-center relative justify-self-center"
      css={css`
        max-width: ${imgW * imgPerSwap + imgPerSwap * 30}px;
      `}
    >
      <button className="btn -left-[40px]">
        <FaAngleLeft />
      </button>
      <div className="w-full max-w-full flex justify-center overflow-x-hidden gap-[30px] border-[3px] border-neutral-600 rounded-xl py-3">
        {urls.slice(0, imgPerSwap).map((url, i) => (
          <div
            key={ids[0][i]}
            css={css`
              ${genSizeCSS(imgW)}
            `}
          >
            <ImgLoader {...{ src: url }} />
          </div>
        ))}
      </div>

      <button className="btn -right-[40px]">
        <FaAngleRight />
      </button>
    </StyledContainer>
  );
};

export default ImagesSwapper;
