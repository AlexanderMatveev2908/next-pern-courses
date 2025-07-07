/** @jsxImportSource @emotion/react */
"use client";

import { useRef, type FC } from "react";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { css } from "@emotion/react";
import CloseBtn from "@/common/components/buttons/CloseBtn";
import { SearchFilterType } from "../../types/uiFactory";

type PropsType = {
  filters: SearchFilterType[];
};

const FilterFooter: FC<PropsType> = ({ filters }) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  const {
    bars: { filterBar },
    setBar,
  } = useSearchCtxConsumer();

  useMouseOut({
    ref: barRef,
    cb: () => setBar({ el: "filterBar", val: false }),
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
        <div className="w-full grid grid-cols-2 border-b-2 border-neutral-800 pb-3 pt-4 px-4">
          <span className="txt__xl justify-self-start text-neutral-200">
            Filter
          </span>

          <div className="w-[100px] justify-self-end pt-2 pr-3 relative">
            <CloseBtn
              {...{
                handleClick: () => setBar({ el: "filterBar", val: false }),
              }}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-[80px_3px_1fr] h-full">
          <div className=""></div>
          <div className="w-full min-h-full bg-neutral-800 "></div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
