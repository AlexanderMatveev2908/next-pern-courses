/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import {
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
  InnerJoinFilterConfType,
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

type PropsType<
  ResT,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
> = {
  hook: [TriggerTypeRTK<ResT, ArgT>, ResultTypeRTK<ResT, ArgT>, any];
  txtInputs: FormT["txtInputs"];
  filters: SearchFilterType<FormT, PathT>[];
  sorters: SearchSortType<FormT, PathT>[];
  innerJoinConf: InnerJoinFilterConfType<FormT, PathT>[];
  handleSave: () => void;
  zodObj: ZodT;
  triggerRef: () => void;
};

const Searchbar = <
  ResT,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
>({
  txtInputs,
  filters,
  sorters,
  innerJoinConf,
  handleSave,
  zodObj,
  hook,
  triggerRef,
}: PropsType<ResT, ArgT, FormT, PathT, ZodT>) => {
  const { setSearcher, updateNoDebounce } = useSearchCtxConsumer();

  const formCtx = useFormContext<FormT>();
  const { setFocus, watch, reset: resetRHF } = formCtx;
  const formDataRHF = watch();
  const mainInput = formDataRHF?.txtInputs?.[0];

  const [triggerRTK, res] = hook;
  const { data: { nHits } = { nHits: 0 } } = (res ?? {}) as unknown as ResT & {
    data: {
      nHits: number;
    };
  };

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
    searchAPI(formDevVals, {});
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
                {...{ filters, innerJoinConf, txtInputs, triggerResetAPI }}
              />

              <SortPop {...{ sorters }} />
            </form>

            <ShowCount {...{ nHits, mainInput, isLoading: res.isFetching }} />
          </>
        )
      }
    </WrapPendingClient>
  );
};

export default Searchbar;
