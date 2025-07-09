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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, res] = hook;

  const {
    data: { nHits, totPages } = { nHits: 0, totPages: 0 },
    isFetching,
    isLoading,
  } = (res ?? {}) as ResultTypeRTK<
    ResT & { nHits: number; totPages: number },
    ArgT
  >;

  return (
    <div className="w-full grid grid-cols-1 gap-10">
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
          isLoading: isLoading || isFetching,
        }}
      >
        {() => children()}
      </WrapPendingClient>

      <PageCounter
        {...{
          nHits,
          totPages,
        }}
      />
    </div>
  );
};

export default WrapSearchQuery;
