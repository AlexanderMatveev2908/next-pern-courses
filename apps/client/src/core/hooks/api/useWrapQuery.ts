import { ApiEventType, UnwrappedResAPI } from "@/common/types/api";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { isStr } from "@shared/first/lib/dataStructure";
import { __cg } from "@shared/first/lib/logger";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHandleErrAPI } from "./useHandleErrAPI";
import { useListenHydration } from "./useListenHydration";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Params<T extends Record<string, any> | void> = {
  hideErr?: boolean;
  showToast?: boolean;

  isSuccess?: boolean;
  isError?: boolean;
  error?: any;
  data?: UnwrappedResAPI<T>;
};

export const useWrapQuery = <T extends Record<string, any> | void>({
  showToast = false,
  hideErr,
  isSuccess,
  isError,
  error,
  data,
}: Params<T>) => {
  const dispatch = useDispatch();
  const { handleErr } = useHandleErrAPI();
  const hasRun = useRef(false);

  const { isHydrated } = useListenHydration();

  const handleQuery = useCallback(() => {
    if (hasRun.current) return;

    if (isSuccess || isError) hasRun.current = true;

    if (isSuccess) {
      __cg("wrapper query", data);

      if (showToast) {
        dispatch(
          toastSlice.actions.open({
            msg: isStr(data?.msg) ? data!.msg : "Things went good ✅",
            type: ApiEventType.SUCCESS,
          }),
        );
      }
    } else if (isError) {
      handleErr({ err: error, hideErr });
    }
  }, [
    handleErr,
    dispatch,
    showToast,
    hideErr,
    isSuccess,
    isError,
    error,
    data,
  ]);

  useEffect(() => {
    if (!isHydrated) return;
    handleQuery();
  }, [handleQuery, isHydrated]);

  const triggerRef = useCallback(() => (hasRun.current = false), []);

  return {
    triggerRef,
  };
};
