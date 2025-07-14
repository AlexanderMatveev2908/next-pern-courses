import { useCallback, useEffect, useReducer, useRef } from "react";
import { initStateQuiz } from "./initState";
import { reducerQuiz } from "./reducer";
import { ActionsQuiz } from "./actions";
import { clearT } from "@/core/lib/etc";

export const useQuiz = () => {
  const [storeRCT, dispatchRCT] = useReducer(reducerQuiz, initStateQuiz);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const setCurrSwap = (val: number) =>
    dispatchRCT({
      type: ActionsQuiz.SET_CURR_SWAPPER,
      payload: val,
    });

  const setMaxH = useCallback(
    (val: number) => dispatchRCT({ type: ActionsQuiz.SET_MAX_H, payload: val }),
    [],
  );

  useEffect(() => {
    if (storeRCT.stageSwap === "swapping") {
      clearT(timerID);

      timerID.current = setTimeout(() => {
        clearT(timerID);

        dispatchRCT({
          type: ActionsQuiz.SET_STAGE_SWAP,
          payload: "swapped",
        });
      }, 400);

      return () => {
        clearT(timerID);
      };
    }
  }, [storeRCT]);

  return {
    ...storeRCT,
    setCurrSwap,
    setMaxH,
    contentRef,
  };
};
