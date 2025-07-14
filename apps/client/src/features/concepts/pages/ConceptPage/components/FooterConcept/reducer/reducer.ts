import { __cg } from "@shared/first/lib/logger.js";
import { ActionsQuiz, ActionsTypeQuiz } from "./actions";
import { QuizStateType } from "./initState";

export const reducerQuiz = (
  state: QuizStateType,
  action: ActionsTypeQuiz,
): QuizStateType => {
  switch (action.type) {
    case ActionsQuiz.SET_CURR_SWAPPER:
      return {
        ...state,
        currSwap: action.payload,
      };

    case ActionsQuiz.SET_MAX_H:
      return {
        ...state,
        maxH: action.payload,
      };

    default:
      __cg("action", action);
      throw new Error("Unknown action 🧐");
  }
};
