/** @jsxImportSource @emotion/react */
"use client";

import { useRef, type FC } from "react";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";
import BlackBg from "@/common/components/elements/BlackBg/BlackBg";
import { useMouseOut } from "@/core/hooks/ui/useMouseOut";
import { css } from "@emotion/react";
import CloseBtn from "@/common/components/buttons/CloseBtn";

type PropsType = {};

const FilterFooter: FC<PropsType> = ({}) => {
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
        className="z__search_component w-full flex fixed bottom-0 left-0 border-[3px] border-neutral-800 rounded-t-xl p-5 h-[600px] bg-neutral-950"
        css={css`
          transition: 0.3s;
        `}
      >
        <div className="w-full grid grid-cols-2">
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
      </div>
    </>
  );
};

export default FilterFooter;
