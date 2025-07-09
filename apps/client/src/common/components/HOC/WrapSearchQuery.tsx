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
import { getLimitPage } from "@/features/layout/components/SearchBar/lib/style";
import SpinnerBtn from "../spinners/SpinnerBtn";
import { useListenHydration } from "@/core/hooks/api/useListenHydration";

type PropsType<
  ResT extends PaginatedResAPI<any>,
  ArgT extends ReqSearchAPI,
  FormT extends FieldValues,
  PathT extends Path<FormT>,
  ZodT extends ZodObject<any>,
> = PropsTypeSearchBar<ResT, ArgT, FormT, PathT, ZodT> & {
  children: () => React.ReactNode;
  formCtx: UseFormReturn<FormT>;
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
  innerJoinConf,
  txtInputs,
  triggerRef,
  zodObj,
  formCtx,
}: PropsType<ResT, ArgT, FormT, PathT, ZodT>) => {
  const [triggerRTK, res] = hook;

  const { watch } = formCtx;
  const valsRHF = watch();

  const {
    data: { nHits, totPages } = { nHits: 0, totPages: 0 },
    isFetching,
    isLoading,
  } = (res ?? {}) as ResultTypeRTK<
    ResT & { nHits: number; totPages: number },
    ArgT
  >;

  const isPending = isLoading || isFetching;

  const { isHydrated } = useListenHydration();

  return (
    <div className="w-full grid grid-cols-1 gap-10 mb-[-75px]">
      <FormProvider {...formCtx}>
        <Searchbar
          {...{
            hook,
            txtInputs,
            filters,
            sorters,
            innerJoinConf,
            handleSave,
            zodObj,
            triggerRef,
          }}
        />
      </FormProvider>

      <WrapPendingClient
        {...{
          isLoading: isPending,
        }}
      >
        {() => children()}
      </WrapPendingClient>

      {isPending ? (
        <div className="w-full flex justify-center pt-[100px]">
          <SpinnerBtn />
        </div>
      ) : (
        isHydrated && (
          <PageCounter
            {...{
              nHits: 34,
              totPages: Math.ceil(34 / getLimitPage()),
              triggerRTK,
              triggerRef,
              valsRHF,
            }}
          />
        )
      )}
    </div>
  );
};

export default WrapSearchQuery;
