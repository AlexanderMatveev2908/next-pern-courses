/** @jsxImportSource @emotion/react */
"use client";

import { useRef } from "react";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { css } from "@emotion/react";
import CloseBtn from "@/common/components/buttons/CloseBtn";
import { SearchFilterType } from "../../types/uiFactory";
import { FieldValues, Path } from "react-hook-form";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import { genStyleFilterLabel } from "./uiFactory";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  filters: SearchFilterType<T, K>[];
  innerJoinConf: {
    keyDependsOn: keyof T;
    filter: SearchFilterType<T, K>;
  }[];
};

const FilterFooter = <T extends FieldValues, K extends Path<T>>({
  filters,
  innerJoinConf,
}: PropsType<T, K>) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  const {
    bars: { filterBar },
    setBar,
    searchers: { currFilter },
    setSearcher,
  } = useSearchCtxConsumer();

  useMouseOut({
    ref: barRef,
    cb: () => setBar({ el: "filterBar", val: false }),
  });

  const { ids } = useGenIDs({
    lengths: [filters.length, innerJoinConf.length],
  });

  const handleCurrFilter = (name: string) =>
    setSearcher({ el: "currFilter", val: name });

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
          <div className="w-full flex flex-col min-h-0 max-h-full px-3 overflow-y-auto scroll__app items-start gap-6 pt-5">
            {filters.map((f, i) => (
              <button
                onClick={handleCurrFilter.bind(null, f.name)}
                type="button"
                css={genStyleFilterLabel(currFilter, f.name)}
                key={ids[0][i]}
                className="btn__app w-full flex items-center gap-5 p-2 justify-center rounded-xl"
                style={
                  {
                    "--scale__up": 1.2,
                  } as React.CSSProperties
                }
              >
                <f.Svg className="min-w-[40px] min-h-[40px]" />
                {/* <span></span> */}
              </button>
            ))}

            {innerJoinConf.map((conf, i) => (
              <button
                onClick={handleCurrFilter.bind(null, conf.filter.name)}
                type="button"
                key={ids[1][i]}
                className="btn__app w-full flex items-center gap-5 justify-center rounded-xl p-2"
                css={genStyleFilterLabel(currFilter, conf.filter.name)}
                style={
                  {
                    "--scale__up": 1.2,
                  } as React.CSSProperties
                }
              >
                <conf.filter.Svg className="w-[40px] h-[40px]" />
                {/* <span></span> */}
              </button>
            ))}
          </div>
          <div className="w-full min-h-full bg-neutral-800 "></div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
