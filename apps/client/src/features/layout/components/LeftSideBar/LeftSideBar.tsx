/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeftSideState, leftSideSLice } from "./slices/slice";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { easeInOut, motion } from "framer-motion";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { genIpsum } from "@/core/lib/etc";
import ToggleSide from "./components/ToggleSide";
import { css } from "@emotion/react";
import ColSide from "./components/ColSide";
import { usePathname } from "next/navigation";
import { coursesSliceAPI } from "@/features/courses/slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { __cg } from "@shared/first/lib/logger.js";
import { useCachedData } from "@/core/hooks/api/useCachedData";

const LeftSideBar: FC = () => {
  const path = usePathname();
  const isPathOK = /^\/courses\/[0-9a-fA-F-]{36}/.test(path);

  const sideRef = useRef<HTMLDivElement | null>(null);
  const leftSideState = useSelector(getLeftSideState);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () => dispatch(leftSideSLice.actions.setSide(false)),
  });

  const { cachedData } = useCachedData({
    selector: coursesSliceAPI.endpoints.getCoursesSummary.select({
      courseID: "ee150b31-0bb1-4511-bda2-9078fb5d4efe",
    }),
  });
  __cg("cached", cachedData);

  const hook = coursesSliceAPI.useLazyGetCoursesSummaryQuery();
  const [triggerRTK, res] = hook;
  const { data, isLoading, isUninitialized } = res;
  useWrapQuery({
    ...res,
    showToast: true,
  });

  useEffect(() => {
    triggerRTK({});
  }, [triggerRTK]);

  return !isPathOK ? null : (
    <>
      <BlackBg
        {...{
          isDark: leftSideState.isSide,
          classIndexCSS: "z__black_bg_left_side",
        }}
      />

      <motion.div
        ref={sideRef}
        className="z__left_side fixed top-[80px] left-0 w-full sm:w-[500px] bg-[#000] border-r-[3px] border-neutral-800 -translate-x-full overflow-y-hidden"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          transform: `translateX(${leftSideState.isSide ? "100%" : "60px"})`,
        }}
        css={css`
          max-height: calc(100% - 80px);
          height: calc(100% - 80px);
        `}
      >
        <div className="w-full flex flex-col h-full max-h-full gap-3 overflow-hidden">
          <ToggleSide />

          <div className="w-full min-h-[50px] tb"></div>

          <div
            className={`w-full grid grid-cols-[1fr_3px_1fr] h-full max-h-full overflow-y-hidden transition-all duration-300 ${leftSideState.isSide ? "opacity-100" : "opacity-0"}`}
          >
            <ColSide>{genIpsum(50)}</ColSide>

            <div className="w-full bg-neutral-800 min-h-full"></div>

            <ColSide>{genIpsum(10)}</ColSide>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LeftSideBar;
