import { useCallback, useReducer, useRef } from "react";
import { initStateQuiz } from "./initState";
import { reducerQuiz } from "./reducer";
import { ActionsQuiz } from "./actions";

export const useQuiz = () => {
  const [storeRCT, dispatchRCT] = useReducer(reducerQuiz, initStateQuiz);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const setCurrSwap = (val: number) =>
    dispatchRCT({
      type: ActionsQuiz.SET_CURR_SWAPPER,
      payload: val,
    });

  const setMaxH = useCallback(
    (val: number) => dispatchRCT({ type: ActionsQuiz.SET_MAX_H, payload: val }),
    [],
  );

  return {
    ...storeRCT,
    setCurrSwap,
    setMaxH,
    contentRef,
  };
};
