/** @jsxImportSource @emotion/react */
"use client";

import { useRef, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeftSideState, leftSideSLice } from "./slices/slice";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { easeInOut, motion } from "framer-motion";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const LeftSideBar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const leftSideState = useSelector(getLeftSideState);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () => dispatch(leftSideSLice.actions.setSide(false)),
  });

  const Svg = leftSideState.isSide ? FaAngleDoubleLeft : FaAngleDoubleRight;

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
        className="z__left_side fixed top-[80px] left-0 h-full w-full sm:w-[500px] bg-[#000] border-r-[3px] border-neutral-800 -translate-x-full"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          transform: `translateX(${leftSideState.isSide ? "100%" : "60px"})`,
        }}
      >
        <div className="grid grid-rows-[50px_60px_1fr] min-h-0 h-full">
          <div className="w-[100px] relative h-fit max-h-fit justify-self-end mr-1 pt-10">
            <button
              type="button"
              className="btn__app absolute top-0 right-0"
              style={
                {
                  "--scale__up": 1.25,
                } as React.CSSProperties
              }
              onClick={() =>
                dispatch(leftSideSLice.actions.setSide(!leftSideState.isSide))
              }
            >
              <Svg className="text-neutral-200 min-w-[50px] min-h-[50px]" />
            </button>
          </div>

          <div className="w-full h-full tb"></div>

          <div className="w-full grid grid-cols-[1fr_3px_1fr] min-h-full h-full">
            <div className="mt-2"></div>

            <div className="min-h-full w-full bg-neutral-800 min-w-full"></div>
            <div className=" mb-2"></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LeftSideBar;
