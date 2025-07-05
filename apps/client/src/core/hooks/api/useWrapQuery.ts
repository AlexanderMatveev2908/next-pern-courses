import { ApiEventType, UnwrappedResAPI } from "@/common/types/api";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { isStr } from "@shared/first/lib/dataStructure";
import { __cg } from "@shared/first/lib/logger";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHandleErrAPI } from "./useHandleErrAPI";

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
  ...rest
}: Params<T>) => {
  const dispatch = useDispatch();
  const { handleErr } = useHandleErrAPI();

  const realDependencies = useMemo(
    () => ({
      showToast,
      hideErr,
      isSuccess: rest.isSuccess,
      isError: rest.isError,
      error: rest.error,
      data: rest.data,
    }),
    [showToast, hideErr, rest.isSuccess, rest.isError, rest.error, rest.data],
  );

  const handleQuery = useCallback(
    <T extends Record<string, any> | void>(args: Params<T>) => {
      const { isSuccess, isError, error, data, hideErr, showToast } = args;

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
    },
    [handleErr, dispatch],
  );

  useEffect(() => {
    handleQuery(realDependencies);
  }, [showToast, realDependencies, handleQuery]);
};
