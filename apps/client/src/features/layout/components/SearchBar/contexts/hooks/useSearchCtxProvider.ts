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

type Params = {
  stateReact: SearchCtxStateType;
  dispatchReact: React.Dispatch<SearchCtxActionsType>;
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

  return {
    ...stateReact,
    preValsRef,
    setBar,
    setSearcher,
    setPending,
    setPagination,
    setCheckPreSubmit,
    setInnerJoinCat,
  };
};

export type SearchCtxValsType = ReturnType<typeof useSearchCtxProvider>;
