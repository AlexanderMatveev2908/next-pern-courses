/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import {
  PaginatedResAPI,
  ReqSearchAPI,
  ResultTypeRTK,
  TriggerTypeRTK,
} from "@/common/types/api";
import {
  DefaultValues,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import { useFocus } from "@/core/hooks/ui/useFocus";
import SecondaryRowBtns from "./components/SecondaryRowBtns";
import PrimaryRow from "./components/PrimaryRow";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import SkeletonSearch from "./components/SkeletonSearch";
import FilterFooter from "./components/FilterFooter/FilterFooter";
import {
  DynamicSubCategoryType,
  SearchFilterType,
  SearchSortType,
} from "./types/uiFactory";
import SortPop from "./components/SortPop/SortPop";
import { useSearchCtxConsumer } from "./contexts/hooks/useSearchCtxConsumer";
import { useCallback, useEffect } from "react";
import WrapImpBtns from "./components/HOC/WrapImpBtns";
import { ZodObject } from "zod";
import { useDebounce } from "./hooks/useDebounce";
import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { v4 } from "uuid";
import { useFactoryAPI } from "./hooks/useFactoryAPI";
import ShowCount from "./components/ShowCount";
import { useListenDummyPending } from "./hooks/useListenDummyPending";

export type PropsTypeSearchBar<
  ResT extends PaginatedResAPI<any>,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
> = {
  hook: [TriggerTypeRTK<ResT, ArgT>, ResultTypeRTK<ResT, ArgT>, any];
  txtInputs: FormT["txtInputs"];
  filters: SearchFilterType<FormT, PathT>[];
  sorters: SearchSortType<FormT, PathT>[];
  handleSave: () => void;
  zodObj: ZodT;
  triggerRef: () => void;
  nHitsCached?: number;
  dynamicFilters: DynamicSubCategoryType<FormT, PathT>[];
};

const Searchbar = <
  ResT extends PaginatedResAPI<any>,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
>({
  txtInputs,
  filters,
  sorters,
  handleSave,
  zodObj,
  hook,
  triggerRef,
  nHitsCached,
  dynamicFilters,
}: PropsTypeSearchBar<ResT, ArgT, FormT, PathT, ZodT>) => {
  const { setSearcher, updateNoDebounce } = useSearchCtxConsumer();

  const formCtx = useFormContext<FormT>();
  const { setFocus, watch, reset: resetRHF } = formCtx;
  const formDataRHF = watch();
  const mainInput = formDataRHF?.txtInputs?.[0];

  const [triggerRTK, res] = hook;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: { nHits, totPages } = {} } = (res ?? {}) as ResultTypeRTK<
    ResT & { nHits: number; totPages: number },
    ArgT
  >;
  const isPending = res.isLoading || res.isFetching;

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

  useListenDummyPending({
    isLoading: isPending,
  });

  const { searchAPI } = useFactoryAPI({
    triggerRef,
    triggerRTK,
    updateNoDebounce,
  });

  const triggerResetAPI = useCallback(() => {
    const formDevVals = {
      txtInputs: [
        {
          ...txtInputs[0],
          id: v4(),
        },
      ],
    };

    resetRHF(formDevVals as unknown as DefaultValues<FormT>);
    searchAPI(formDevVals, {
      syncPending: "clear",
    });
  }, [resetRHF, txtInputs, searchAPI]);

  return (
    <WrapPendingClient {...{ isLoading: false }}>
      {({ isHydrated } = { isHydrated: false }) =>
        !isHydrated ? (
          <SkeletonSearch />
        ) : (
          <>
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
                  <WrapImpBtns {...{ txtInputs, triggerResetAPI }} />
                </div>
              </div>

              <FilterFooter
                {...{ filters, txtInputs, triggerResetAPI, dynamicFilters }}
              />

              <SortPop {...{ sorters }} />
            </form>

            <ShowCount
              {...{
                nHits,
                mainInput,
                nHitsCached,
                isLoading: isPending,
                isUninitialized: res.isUninitialized,
              }}
            />
          </>
        )
      }
    </WrapPendingClient>
  );
};

export default Searchbar;
