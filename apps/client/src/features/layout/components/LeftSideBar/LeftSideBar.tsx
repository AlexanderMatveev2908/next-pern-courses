/** @jsxImportSource @emotion/react */
"use client";

import { useRef, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeftSideState, leftSideSLice } from "./slices/slice";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { easeInOut, motion } from "framer-motion";
import { css } from "@emotion/react";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import CloseBtn from "@/common/components/buttons/CloseBtn";

const LeftSideBar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const leftSideState = useSelector(getLeftSideState);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () => dispatch(leftSideSLice.actions.setSide(false)),
  });

  return (
    <>
      <BlackBg
        {...{
          isDark: leftSideState.isSide,
          classIndexCSS: "z__black_bg_left_side",
        }}
      />

      <motion.div
        ref={sideRef}
        className="z__left_side fixed top-[80px] left-0 h-full w-[80%] md:w-[400px] bg-[#000] border-r-[3px] border-neutral-800 -translate-x-full"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          opacity: leftSideState.isSide ? 1 : 0.5,
          transform: `translateX(${leftSideState.isSide ? "100%" : "0%"})`,
        }}
        css={css`
          pointer-events: ${leftSideState.isSide ? "all" : "none"};
        `}
      >
        <div className="grid grid-rows-[45px_1fr] min-h-0 h-full">
          <div className="w-[100px] relative h-fit max-h-fit justify-self-end mr-1 pt-10">
            <CloseBtn
              {...{
                handleClick: () =>
                  dispatch(leftSideSLice.actions.setSide(false)),
              }}
            />
          </div>

          <div className="w-full grid grid-cols-[1fr_3px_2fr] min-h-full h-full">
            <div className=" mt-2"></div>

            <div className="min-h-full w-full bg-neutral-800 min-w-full"></div>
            <div className=" mb-2"></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LeftSideBar;
