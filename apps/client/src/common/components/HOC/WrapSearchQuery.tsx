/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import {
  FieldValues,
  FormProvider,
  Path,
  UseFormReturn,
} from "react-hook-form";
import WrapPendingClient from "./WrapPendingClient";
import Searchbar, {
  PropsTypeSearchBar,
} from "@/features/layout/components/SearchBar/Searchbar";
import {
  PaginatedResAPI,
  ReqSearchAPI,
  ResultTypeRTK,
} from "@/common/types/api";
import { ZodObject } from "zod";
import PageCounter from "@/features/layout/components/SearchBar/components/PageCounter/PageCounter";
import SpinnerBtn from "../spinners/SpinnerBtn";
import { DynamicSubCategoryType } from "@/features/layout/components/SearchBar/types/uiFactory";

type PropsType<
  ResT extends PaginatedResAPI<any>,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
> = PropsTypeSearchBar<ResT, ArgT, FormT, PathT, ZodT> & {
  children: (arg: { isHydrated: boolean }) => React.ReactNode;
  formCtx: UseFormReturn<FormT>;
  nHitsCached?: number;
  pagesCached?: number;
  dynamicFilters: DynamicSubCategoryType<FormT, PathT>[];
};

const WrapSearchQuery = <
  ResT extends PaginatedResAPI<any>,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
>({
  children,
  filters,
  handleSave,
  hook,
  sorters,
  txtInputs,
  triggerRef,
  zodObj,
  formCtx,
  nHitsCached,
  dynamicFilters,
  // pagesCached,
}: PropsType<ResT, ArgT, FormT, PathT, ZodT>) => {
  const [triggerRTK, res] = hook;

  const { watch } = formCtx;
  const valsRHF = watch();

  const {
    data: { nHits, pages } = {},
    isFetching,
    isLoading,
  } = (res ?? {}) as ResultTypeRTK<
    ResT & { nHits: number; pages: number },
    ArgT
  >;

  const isPending = isLoading || isFetching;

  // const grabProperInt = ({
  //   isHydrated,
  //   val,
  //   fallback,
  // }: {
  //   isHydrated: boolean;
  //   val?: number;
  //   fallback?: number;
  // }) => {
  //   __cg("arg cb", ["val", val], ["fallback", fallback]);

  //   return isHydrated && typeof val === "number" ? val : fallback;
  // };
  return (
    <div className="w-full grid grid-cols-1 gap-10 mb-[-75px]">
      <FormProvider {...formCtx}>
        <Searchbar
          {...{
            hook,
            txtInputs,
            filters,
            sorters,
            handleSave,
            zodObj,
            triggerRef,
            nHitsCached,
            dynamicFilters,
          }}
        />
      </FormProvider>

      <WrapPendingClient
        {...{
          isLoading: isPending,
        }}
      >
        {({ isHydrated } = { isHydrated: false }) =>
          children({
            isHydrated,
          })
        }
      </WrapPendingClient>

      <WrapPendingClient
        {...{
          isLoading: isPending,
          CustomSpinner: (
            <>
              <div className="w-full flex justify-center pt-[100px]">
                <SpinnerBtn />
              </div>
            </>
          ),
        }}
      >
        {({ isHydrated } = { isHydrated: false }) =>
          !isHydrated ? null : (
            <PageCounter
              {...{
                nHits,
                totPages: pages,
                triggerRTK,
                triggerRef,
                valsRHF,
              }}
            />
          )
        }
      </WrapPendingClient>
    </div>
  );
};

export default WrapSearchQuery;
