/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useHandleErrAPI } from "./useHandleErrAPI";
import { useCallback } from "react";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { ApiEventType } from "@/common/types/api";
import { __cg } from "@shared/first/lib/logger";

export const useWrapMutation = () => {
  const dispatch = useDispatch();

  const { handleErr } = useHandleErrAPI();

  const wrapMutation = useCallback(
    async ({
      cbAPI,
      showToast = true,
    }: {
      cbAPI: () => Promise<any>;
      showToast?: boolean;
    }) => {
      try {
        const data = await cbAPI().unwrap();

        __cg("wrapper mutation", data);

        if (showToast)
          dispatch(
            toastSlice.actions.open({
              msg: data.msg,
              type: ApiEventType.success,
            }),
          );

        return data;
      } catch (err) {
        handleErr({ err });
      }
    },
    [handleErr, dispatch],
  );

  return { wrapMutation };
};
