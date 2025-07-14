export type ResQuizType = {
  questionID: string;
  answerID: string;
};

export type QuizStateType = {
  currSwap: number;
  maxH: number;
  answers: ResQuizType[];
};

export const initStateQuiz: QuizStateType = {
  currSwap: 0,
  maxH: 0,
  answers: [] as ResQuizType[],
};
