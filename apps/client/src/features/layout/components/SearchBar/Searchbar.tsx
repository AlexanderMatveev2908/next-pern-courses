/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { ResultTypeRTK, TriggerTypeRTK } from "@/common/types/api";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useFocus } from "@/core/hooks/ui/useFocus";
import SecondaryRowBtns from "./components/SecondaryRowBtns";
import PrimaryRow from "./components/PrimaryRow";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import SkeletonSearch from "./components/SkeletonSearch";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";
import FilterFooter from "./components/FilterFooter/FilterFooter";
import {
  InnerJoinFilterConfType,
  SearchFilterType,
  SearchSortType,
} from "./types/uiFactory";
import SortPop from "./components/SortPop/SortPop";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { useEffect, useRef } from "react";
import WrapImpBtns from "./components/HOC/WrapImpBtns";
import { isSameObj } from "@shared/first/lib/etc.js";
import { __cg } from "@shared/first/lib/logger.js";
import { ZodObject } from "zod";
import cloneDeep from "lodash.clonedeep";
import { clearT } from "@/core/lib/etc";

type PropsType<
  T,
  K,
  U extends FieldValues,
  P extends Path<U>,
  R extends ZodObject<any>,
> = {
  hook: [TriggerTypeRTK<T, K>, ResultTypeRTK<T, K>, any];
  txtInputs: U["txtInputs"];
  filters: SearchFilterType<U, P>[];
  sorters: SearchSortType<U, P>[];
  innerJoinConf: InnerJoinFilterConfType<U, P>[];
  handleSave: () => void;
  zodObj: R;
};

const Searchbar = <
  T,
  K,
  U extends FieldValues,
  P extends Path<U>,
  R extends ZodObject<any>,
>({
  txtInputs,
  filters,
  sorters,
  innerJoinConf,
  handleSave,
  zodObj,
}: PropsType<T, K, U, P, R>) => {
  const {
    setSearcher,
    preValsRef,
    setCheckPreSubmit,
    checkPreSubmit: { canMakeAPI },
    pagination: { page, limit },
  } = useSearchCtxConsumer();
  const formCtx = useFormContext<U>();
  const { setFocus, watch } = formCtx;
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useFocus({
    cb: () => setFocus(`txtInputs.0.val` as any),
  });
  useEffect(() => {
    setSearcher({
      el: "currFilter",
      val: filters[0].name,
    });
  }, [filters, setSearcher]);

  const formDataRHF = watch();

  useEffect(() => {
    const merged = cloneDeep({
      ...formDataRHF,
      page,
      limit,
    });

    const isSameData = isSameObj(merged, preValsRef.current);
    const resultZod = zodObj.safeParse(merged);
    const isValid = resultZod.success;

    // __cg("comparison data", merged, preValsRef.current);

    if (!isValid || isSameData || !canMakeAPI) {
      preValsRef.current = merged;

      __cg(
        "conf valid data",
        ["is valid", isValid],
        ["is same data", isSameData],
        ["can make api", canMakeAPI],
      );

      if (!canMakeAPI)
        setCheckPreSubmit({
          el: "canMakeAPI",
          val: true,
        });

      clearT(timerID);
      return;
    }

    clearT(timerID);

    timerID.current = setTimeout(() => {
      __cg("debounce update");

      preValsRef.current = merged;
      clearT(timerID);
    }, 500);

    return () => {
      clearT(timerID);
    };
  }, [
    formDataRHF,
    page,
    limit,
    preValsRef,
    zodObj,
    canMakeAPI,
    setCheckPreSubmit,
  ]);

  const { isHydrated } = useListenHydration();

  return !isHydrated ? (
    <SkeletonSearch />
  ) : (
    <form
      onSubmit={handleSave}
      className="w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl grid grid-cols-1 gap-6 max-w-[1200px]"
    >
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

        <div className="w-full grid grid-cols-1 gap-6">
          <WrapImpBtns {...{ txtInputs }} />
        </div>
      </div>

      <FilterFooter {...{ filters, innerJoinConf, txtInputs }} />

      <SortPop {...{ sorters }} />
    </form>
  );
};

export default Searchbar;
