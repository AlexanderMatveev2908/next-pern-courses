/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useFocus } from "@/core/hooks/ui/useFocus";
import { __cg } from "@shared/first/lib/logger.js";
import SecondaryRowBtns from "./components/SecondaryRowBtns";
import PrimaryRow from "./components/PrimaryRow";
import ThirdRawBtns from "./components/ThirdRawBtns";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import SkeletonSearch from "./components/SkeletonSearch";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import FilterFooter from "./components/FilterFooter/FilterFooter";
import { SearchFilterType, SearchSortType } from "./types/uiFactory";
import SortPop from "./components/SortPop/SortPop";

type PropsType<T, K, U extends FieldValues, P extends Path<U>> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
  txtInputs: U["txtInputs"];
  filters: SearchFilterType<U, P>[];
  sorters: SearchSortType<U, P>[];
};

const Searchbar = <T, K, U extends FieldValues, P extends Path<U>>({
  txtInputs,
  filters,
  sorters,
}: PropsType<T, K, U, P>) => {
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

      <FilterFooter {...{ filters }} />

      <SortPop {...{ sorters }} />
    </form>
  );
};

export default Searchbar;
