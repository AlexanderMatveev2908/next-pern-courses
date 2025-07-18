/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearT } from "@/core/lib/etc";
import { useEffect, useRef } from "react";

type Params = {
  cb: () => void;
  delay: number;
  optDep?: any[];
};

export const useSyncUiDelay = ({ cb, optDep, delay }: Params) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    clearT(timerID);

    timerID.current = setTimeout(() => {
      cb();
      clearT(timerID);
    }, delay);

    return () => {
      clearT(timerID);
    };
  }, [cb, optDep, delay]);
};
