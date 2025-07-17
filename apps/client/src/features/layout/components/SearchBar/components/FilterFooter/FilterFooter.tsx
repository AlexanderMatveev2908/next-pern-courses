/** @jsxImportSource @emotion/react */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import CloseBtn from "@/common/components/buttons/CloseBtn";
import {
  DynamicSubCategoryType,
  SearchFilterType,
} from "../../types/uiFactory";
import { FieldValues, Path } from "react-hook-form";
import ColumnLabels from "./components/ColumnLabels";
import ColumnVals from "./components/ColumnVals";
import { css } from "@emotion/react";
import WrapImpBtns from "../HOC/WrapImpBtns";
import { FieldArrType } from "@/common/types/uiFactory";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  filters: SearchFilterType<T, K>[];
  txtInputs: FieldArrType<T, K>[];
  triggerResetAPI: () => void;
  dynamicFilters: DynamicSubCategoryType<T, K>[];
};

const FilterFooter = <T extends FieldValues, K extends Path<T>>({
  filters,
  txtInputs,
  triggerResetAPI,
  dynamicFilters,
}: PropsType<T, K>) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    if (!labelRef.current) return;

    const cb = () => setElementHeight(labelRef.current?.scrollHeight ?? 0);

    cb();

    const obs = new ResizeObserver(cb);
    window.addEventListener("resize", cb);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", cb);
    };
  }, []);

  const {
    bars: { filterBar },
    setBar,
  } = useSearchCtxConsumer();

  const cb = useCallback(
    () => setBar({ el: "filterBar", val: false }),
    [setBar],
  );

  useMouseOut({
    ref: barRef,
    cb,
  });

  return (
    <>
      <BlackBg
        {...{
          classIndexCSS: "z__black_bg__search_component",
          isDark: filterBar,
        }}
      />

      <div
        ref={barRef}
        className="z__search_component w-full flex flex-col fixed bottom-0 left-0 border-[3px] border-neutral-800 rounded-t-xl h-[600px] bg-neutral-950"
        css={css`
          transition: 0.4s;

          transform: translateY(${filterBar ? "0" : "100%"});
          opacity: ${filterBar ? 1 : 0.5};
          pointer-events: ${filterBar ? "all" : "none"};
        `}
      >
        <div
          ref={labelRef}
          className="w-full grid grid-cols-2 border-b-2 border-neutral-800 pb-3 pt-4 px-4"
        >
          <span className="txt__2xl justify-self-start text-neutral-200">
            Filter
          </span>

          <div className="w-[100px] justify-self-end -mt-2 pr-3 relative">
            <CloseBtn
              {...{
                handleClick: () => setBar({ el: "filterBar", val: false }),
              }}
            />
          </div>
        </div>

        <div
          className="w-full grid grid-cols-[80px_3px_1fr] md:grid-cols-[250px_3px_1fr] relative"
          css={css`
            max-height: calc(100% - ${elementHeight + 80}px);
            height: 100%;
          `}
        >
          <ColumnLabels
            {...{
              filters,
              dynamicFilters,
            }}
          />
          <div className="w-full min-h-full bg-neutral-800 "></div>

          <ColumnVals
            {...{
              filters,
              dynamicFilters,
            }}
          />
        </div>

        <div className="w-full absolute bottom-0 left-0 h-[80px] flex justify-center items-center bg-neutral-950 border-t-[3px] border-neutral-800 z-60">
          <WrapImpBtns {...{ txtInputs, triggerResetAPI }} />
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
