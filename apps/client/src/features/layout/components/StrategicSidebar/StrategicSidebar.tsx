/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStrategicSliceState, strategicSlice } from "./slices/slice";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { easeInOut, motion } from "framer-motion";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import ToggleSide from "./components/ToggleSide";
import { css } from "@emotion/react";
import { useParams, usePathname } from "next/navigation";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import CoursesSideList from "./components/CoursesList/CoursesSideList";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import SideConceptsList from "./components/ConceptsList/SideConceptsList";

const StrategicSidebar: FC = () => {
  const path = usePathname();
  const isPathOK = /^\/(courses|concepts)\/[0-9a-fA-F-]{36}/.test(path);

  const { courseID } = useParams();

  const sideRef = useRef<HTMLDivElement | null>(null);
  const leftSideState = useSelector(getStrategicSliceState);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () => dispatch(strategicSlice.actions.setSide(false)),
  });

  useEffect(() => {
    if (isStr(courseID as string))
      dispatch(strategicSlice.actions.setCurrCourseID(courseID as string));
  }, [courseID, dispatch]);

  const { isHydrated } = useListenHydration();

  __cg("rerender");

  return !isPathOK || !isHydrated ? null : (
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
            <CoursesSideList />

            <div className="w-full bg-neutral-800 min-h-full"></div>

            <SideConceptsList />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default StrategicSidebar;
