import { REG_ID } from "@shared/first/constants/regex.js";
import z from "zod";

const schemaQuestion = z.object({
  questionID: z.string().regex(REG_ID, "Invalid ID"),
  answerID: z.string().regex(REG_ID, "Invalid ID"),
});

export const schemaQuiz = z.object({
  question: z.array(schemaQuestion),
});

export type FormQuizType = z.infer<typeof schemaQuiz>;
