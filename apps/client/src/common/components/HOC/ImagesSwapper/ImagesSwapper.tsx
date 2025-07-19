/** @jsxImportSource @emotion/react */
"use client";

import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import ImgLoader from "../assets/ImgLoader";
import { genSizeCSS, getImgParSwap, grabImgWSlider } from "./uiFactory";
import { css } from "@emotion/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { StyledContainer } from "./Styled";
import { easeInOut, motion } from "framer-motion";
import { clearT } from "@/core/lib/etc";

type PropsType = {
  urls: string[];
  exceptionSwapperImg?: number;
};

const ImagesSwapper: FC<PropsType> = ({ urls, exceptionSwapperImg }) => {
  const [currSLide, setCurrSLide] = useState(0);
  const [imgW, setImgW] = useState(grabImgWSlider());
  const [imgPerSwap, setImgPerSwap] = useState(
    getImgParSwap(imgW, exceptionSwapperImg),
  );

  const timerID = useRef<NodeJS.Timeout | null>(null);
  const [pause, setPause] = useState(false);

  const maxSwapsPossible = useMemo(
    () => Math.ceil(urls.length / imgPerSwap),
    [urls, imgPerSwap],
  );

  const calcRange = (i: number) => {
    const start = currSLide * imgPerSwap;
    const end = (currSLide + 1) * imgPerSwap;

    return i >= start && i < end;
  };

  useEffect(() => {
    const listen = () => {
      setImgW(grabImgWSlider());
      setImgPerSwap(getImgParSwap(imgW, exceptionSwapperImg));

      if (currSLide >= maxSwapsPossible) setCurrSLide(maxSwapsPossible - 1);
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [currSLide, maxSwapsPossible, imgW, exceptionSwapperImg]);

  const { ids } = useGenIDs({
    lengths: [urls.length],
  });

  const handleClick = useCallback(
    (dir: "-" | "+", triggerClick?: boolean) => {
      if (triggerClick) {
        setPause(true);
        clearT(timerID);
      }

      setCurrSLide((prev) =>
        dir === "+" && prev >= maxSwapsPossible - 1
          ? 0
          : dir === "-" && prev - 1 < 0
            ? maxSwapsPossible - 1
            : prev + (dir === "+" ? 1 : -1),
      );
    },
    [maxSwapsPossible],
  );

  useEffect(() => {
    const slideImages = async () => {
      if (pause) {
        clearT(timerID);
        return;
      }

      while (!pause) {
        clearT(timerID);

        await new Promise<void>((res) => {
          timerID.current = setTimeout(() => {
            if (pause) {
              clearT(timerID);
              return;
            }
            handleClick("+");
            clearT(timerID);
            res();
          }, 2000);
        });
      }
    };

    slideImages();

    return () => {
      clearT(timerID);
    };
  }, [handleClick, pause]);

  useEffect(() => {
    const handlePause = () => {
      if (!pause) return;

      clearT(timerID);
      timerID.current = setTimeout(() => {
        setPause(false);
        clearT(timerID);
      }, 3000);
    };

    handlePause();

    return () => {
      clearT(timerID);
    };
  }, [pause]);

  return (
    <StyledContainer
      className="flex relative justify-self-center border-[3px] border-neutral-600 rounded-xl py-3"
      css={css`
        width: fit-content;
        max-width: ${imgW * imgPerSwap + imgPerSwap * 20 + 10}px;
      `}
    >
      <button
        onClick={handleClick.bind(null, "-", true)}
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
        onClick={handleClick.bind(null, "+", true)}
        className="btn -right-[40px]"
      >
        <FaAngleRight />
      </button>
    </StyledContainer>
  );
};

export default ImagesSwapper;
