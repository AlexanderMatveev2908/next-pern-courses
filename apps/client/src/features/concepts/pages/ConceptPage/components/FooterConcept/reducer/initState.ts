export type ResQuizType = {
  questionID: string;
  answerID: string;
};

export type QuizzesStateType = {
  currSwapper: number;
  answers: ResQuizType[];
};

export const initState = {
  currSwapper: 0,
  responses: [],
};
