export type ResQuizType = {
  questionID: string;
  answerID: string;
};

export type SwapStageType = "swapped" | "swapping";

export type QuizStateType = {
  currSwap: number;
  stageSwap: SwapStageType;
  maxH: number;
};

export const initStateQuiz: QuizStateType = {
  currSwap: 0,
  maxH: 0,
  stageSwap: "swapped",
};
