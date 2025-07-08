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
import FilterFooter from "./components/FilterFooter/FilterFooter";
import {
  InnerJoinFilterConfType,
  SearchFilterType,
  SearchSortType,
} from "./types/uiFactory";
import SortPop from "./components/SortPop/SortPop";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { useEffect } from "react";
import WrapImpBtns from "./components/HOC/WrapImpBtns";
import { ZodObject } from "zod";
import { useDebounce } from "./hooks/useDebounce";
import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";

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
  triggerRef: () => void;
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
  hook,
  triggerRef,
}: PropsType<T, K, U, P, R>) => {
  const { setSearcher } = useSearchCtxConsumer();

  const formCtx = useFormContext<U>();
  const { setFocus, watch } = formCtx;
  const formDataRHF = watch();

  const [triggerRTK] = hook;

  useFocus({
    cb: () => setFocus(`txtInputs.0.val` as any),
  });

  useEffect(() => {
    setSearcher({
      el: "currFilter",
      val: filters[0].name,
    });
  }, [filters, setSearcher]);

  useDebounce({
    formDataRHF,
    zodObj,
    triggerRTK,
    triggerRef,
  });

  return (
    <WrapPendingClient {...{ isLoading: false }}>
      {({ isHydrated } = { isHydrated: false }) =>
        !isHydrated ? (
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
        )
      }
    </WrapPendingClient>
  );
};

export default Searchbar;
