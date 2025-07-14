export type ResQuizType = {
  questionID: string;
  answerID: string;
};

export type QuizStateType = {
  currSwap: number;
  maxH: number;
};

export const initStateQuiz: QuizStateType = {
  currSwap: 0,
  maxH: 0,
};
