import { useEffect, useRef } from "react";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";
import { clearT } from "@/core/lib/etc";

type Params = {
  isLoading: boolean;
};

export const useListenDummyPending = ({ isLoading }: Params) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    isSearchPending: { clear, submit },
    clearPending,
  } = useSearchCtxConsumer();

  useEffect(() => {
    if (isLoading) return;

    if (!isLoading && [clear, submit].some(Boolean))
      timerID.current = setTimeout(() => {
        clearPending();
        clearT(timerID);
      }, 500);

    return () => {
      clearT(timerID);
    };
  }, [clearPending, clear, submit, isLoading]);

  return {};
};
