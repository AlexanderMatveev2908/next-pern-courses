import { SwapStageType } from "./initState";

export enum ActionsQuiz {
  SET_CURR_SWAPPER = "SET_CURR_SWAPPER",
  SET_STAGE_SWAP = "SET_STAGE_SWAP",
  PUSH_ANSWER = "PUSH_ANSWER",
  SET_MAX_H = "SET_MAX_H",
  END_SWAP = "END_SWAP",
}

export type ActionsTypeQuiz =
  | {
      type: ActionsQuiz.SET_CURR_SWAPPER;
      payload: number;
    }
  | {
      type: ActionsQuiz.SET_MAX_H;
      payload: number;
    }
  | {
      type: ActionsQuiz.SET_STAGE_SWAP;
      payload: SwapStageType;
    };
