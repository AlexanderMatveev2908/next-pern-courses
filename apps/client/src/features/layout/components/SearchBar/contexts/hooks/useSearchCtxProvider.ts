/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import {
  ParamsBar,
  ParamsCheckSubmit,
  ParamsPagination,
  ParamsPending,
  ParamsSearch,
  SearchCtxActions,
  SearchCtxActionsType,
} from "../reducer/actions";
import { SearchCtxStateType } from "../reducer/initState";
import { FieldValues } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";
import { __cg } from "@shared/first/lib/logger.js";

type Params = {
  stateReact: SearchCtxStateType;
  dispatchReact: React.Dispatch<SearchCtxActionsType>;
};

type ParamsUpdateNoDebounce<T extends FieldValues> = {
  vals: T[keyof T] & {
    page: number;
    limit: number;
  };
};

export const useSearchCtxProvider = ({ dispatchReact, stateReact }: Params) => {
  const preValsRef = useRef<Record<string, any> | null>(null);

  const setBar = useCallback(
    (arg: ParamsBar) =>
      dispatchReact({ type: SearchCtxActions.SET_BAR, payload: arg }),
    [dispatchReact],
  );

  const setSearcher = useCallback(
    (arg: ParamsSearch) =>
      dispatchReact({ type: SearchCtxActions.SET_SEARCHER, payload: arg }),
    [dispatchReact],
  );

  const setPending = useCallback(
    (arg: ParamsPending) =>
      dispatchReact({ type: SearchCtxActions.SET_IS_PENDING, payload: arg }),
    [dispatchReact],
  );

  const setPagination = useCallback(
    (arg: ParamsPagination) =>
      dispatchReact({ type: SearchCtxActions.SET_PAGINATION, payload: arg }),
    [dispatchReact],
  );

  const setCheckPreSubmit = useCallback(
    (arg: ParamsCheckSubmit) =>
      dispatchReact({
        type: SearchCtxActions.SET_CHECK_PRE_SUBMIT,
        payload: arg,
      }),
    [dispatchReact],
  );

  const setInnerJoinCat = useCallback(
    (arg: string[]) =>
      dispatchReact({
        type: SearchCtxActions.SET_INNER_JOIN_CAT,
        payload: arg,
      }),
    [dispatchReact],
  );

  const updateNoDebounce = useCallback(
    ({ vals }: ParamsUpdateNoDebounce<FieldValues>) => {
      setCheckPreSubmit({ el: "canMakeAPI", val: false });

      preValsRef.current = cloneDeep(vals);
    },
    [setCheckPreSubmit],
  );

  const resetData = useCallback(
    ({ vals }: ParamsUpdateNoDebounce<FieldValues>) => {
      updateNoDebounce({ vals });

      __cg("force update");
    },
    [updateNoDebounce],
  );

  return {
    ...stateReact,
    preValsRef,
    setBar,
    setSearcher,
    setPending,
    setPagination,
    setCheckPreSubmit,
    setInnerJoinCat,
    updateNoDebounce,
    resetData,
  };
};

export type SearchCtxValsType = ReturnType<typeof useSearchCtxProvider>;
