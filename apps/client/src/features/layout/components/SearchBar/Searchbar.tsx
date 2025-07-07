/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
import { FieldValues, useFormContext } from "react-hook-form";
import { useFocus } from "@/core/hooks/ui/useFocus";
import { __cg } from "@shared/first/lib/logger.js";
import SecondaryRowBtns from "./components/SecondaryRowBtns";
import PrimaryRow from "./components/PrimaryRow";
import ThirdRawBtns from "./components/ThirdRawBtns";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import SkeletonSearch from "./components/SkeletonSearch";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import FilterFooter from "./components/FilterFooter";

type PropsType<T, K, U extends FieldValues> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
  txtInputs: U["txtInputs"];
};

const Searchbar = <T, K, U extends FieldValues>({
  txtInputs,
}: PropsType<T, K, U>) => {
  // const ctx = useSearchCtxConsumer();
  const formCtx = useFormContext<U>();
  const { setFocus, watch } = formCtx;

  useFocus({
    cb: () => setFocus(`txtInputs.0.val` as any),
  });

  __cg("form", watch());

  const { isHydrated } = useListenHydration();

  return !isHydrated ? (
    <SkeletonSearch />
  ) : (
    <form className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-6 max-w-[1200px]">
      <PrimaryRow {...{ txtInputs }} />

      <div
        className="w-full grid grid-cols-1 gap-6"
        css={css`
          ${resp(1150)} {
            grid-template-columns: repeat(2, 1fr);
          }
        `}
      >
        <SecondaryRowBtns {...{ txtInputs }} />

        <ThirdRawBtns />
      </div>

      <FilterFooter />
    </form>
  );
};

export default Searchbar;
