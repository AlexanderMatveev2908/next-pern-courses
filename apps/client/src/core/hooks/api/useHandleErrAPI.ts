import { ApiEventType, ErrAPI } from "@/common/types/api";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { isStr } from "@shared/first/lib/dataStructure";
import { __cg } from "@shared/first/lib/logger";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useHandleErrAPI = () => {
  const dispatch = useDispatch();

  const handleErr = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends Record<string, any>>({
      err,
      hideErr,
      throwErr,
    }: {
      err: ErrAPI<T>;
      hideErr?: boolean;
      throwErr?: boolean;
    }) => {
      __cg("wrapper error", err);

      const { data } = err;

      if (!hideErr)
        dispatch(
          toastSlice.actions.open({
            msg: isStr(data?.msg) ? data.msg : "Ops something went wrong ❌",
            type: ApiEventType.ERROR,
          }),
        );

      if (throwErr) throw err;
    },
    [dispatch],
  );

  return {
    handleErr,
  };
};
