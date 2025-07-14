import { ResQuizType } from "./initState";

export enum ActionsQuiz {
  SET_CURR_SWAPPER = "SET_CURR_SWAPPER",
  PUSH_ANSWER = "PUSH_ANSWER",
  SET_MAX_H = "SET_MAX_H",
}

export type ActionsTypeQuiz =
  | {
      type: ActionsQuiz.SET_CURR_SWAPPER;
      payload: number;
    }
  | {
      type: ActionsQuiz.PUSH_ANSWER;
      payload: ResQuizType;
    }
  | {
      type: ActionsQuiz.SET_MAX_H;
      payload: number;
    };
