/* eslint-disable @typescript-eslint/no-explicit-any */
import { __cg } from "@shared/first/lib/logger";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useHandleErrAPI = () => {
  const dispatch = useDispatch();

  const handleErr = useCallback(
    ({ err, hideErr }: { err: any; hideErr?: boolean }) => {
      __cg("wrapper error", err);
    },
    [],
  );

  return {
    handleErr,
  };
};
