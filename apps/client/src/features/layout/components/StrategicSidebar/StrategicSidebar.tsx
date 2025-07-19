/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStrategicSliceState, strategicSlice } from "./slices/slice";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { easeInOut, motion } from "framer-motion";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import ToggleSide from "./components/ToggleSide";
import { css } from "@emotion/react";
import { usePathname } from "next/navigation";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import CoursesSideList from "./components/CoursesSideList";
import SideConceptsList from "./components/SideConceptsList";
import SideSearchBar from "./components/SideSearchBar";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaSideSummaryForm,
  SideSummaryFormType,
} from "@shared/first/paperwork/concepts/schema.summary.js";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { useSyncUiDelay } from "@/core/hooks/ui/useSyncUiDelay";
import { isWindow } from "@/core/lib/etc";
import { uiBreaks } from "@/core/constants/uiBreaks";

export const calcIsAlwaysOpen = () =>
  !isWindow() ? false : window.innerWidth > uiBreaks.lg;

const StrategicSidebar: FC = () => {
  const path = usePathname();
  const isPathOK = /^\/(courses|concepts)\/[0-9a-fA-F-]{36}/.test(path);
  const sideRef = useRef<HTMLDivElement | null>(null);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(calcIsAlwaysOpen());

  useEffect(() => {
    const listen = () => setIsAlwaysOpen(calcIsAlwaysOpen());

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  const strategicSideState = useSelector(getStrategicSliceState);

  const dispatch = useDispatch();
  useMouseOut({
    ref: sideRef,
    cb: () =>
      calcIsAlwaysOpen()
        ? null
        : dispatch(strategicSlice.actions.setSide(false)),
  });

  const { isHydrated } = useListenHydration();

  const formCtx = useForm<SideSummaryFormType>({
    resolver: zodResolver(schemaSideSummaryForm),
    mode: "onChange",
  });

  const optDep = useMemo(
    () => [strategicSideState.isSide],
    [strategicSideState.isSide],
  );
  useSyncUiDelay({
    delay: 300,
    cb: () => dispatch(strategicSlice.actions.endSwapState()),
    optDep,
  });

  const hook = conceptsSliceAPI.useLazyGetSideSummaryConceptsQuery();

  return !isPathOK || !isHydrated ? null : (
    <>
      <BlackBg
        {...{
          isDark: strategicSideState.isSide && !isAlwaysOpen,
          classIndexCSS: "z__black_bg_left_side",
        }}
      />

      {/* ? i really do not know when strategic sidebar should become always open 🥸 */}
      <motion.div
        ref={sideRef}
        className="z__left_side fixed top-[80px] left-0 w-full sm:w-[90%] lg:w-[500px] md:w-[600px] bg-[#000] border-r-[3px] border-neutral-800 -translate-x-full overflow-y-hidden"
        transition={{ duration: 0.3, ease: easeInOut }}
        animate={{
          transform: `translateX(${strategicSideState.isSide ? "100%" : "60px"})`,
        }}
        css={css`
          max-height: calc(100% - 80px);
          height: calc(100% - 80px);
        `}
      >
        <FormProvider {...formCtx}>
          <div className="w-full flex flex-col h-full max-h-full gap-4 overflow-hidden">
            {!calcIsAlwaysOpen() && <ToggleSide />}

            <div
              className={`w-full flex flex-col gap-6 transition-all duration-300 overflow-y-auto pt-2 ${strategicSideState.isSide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="w-full min-h-[50px]">
                <SideSearchBar {...{ hook }} />
              </div>

              <div
                className={`w-full grid grid-cols-[1fr_3px_1fr] h-full max-h-full overflow-y-hidden`}
              >
                <CoursesSideList />

                <div className="w-full bg-neutral-800 min-h-full"></div>

                <SideConceptsList
                  {...{
                    hook,
                  }}
                />
              </div>
            </div>
          </div>
        </FormProvider>
      </motion.div>
    </>
  );
};

export default StrategicSidebar;
