import { REG_ID } from "@shared/first/constants/regex.js";
import z from "zod";

const schemaQuestion = z.object({
  questionID: z.string().regex(REG_ID, "Invalid ID"),
  answerIDs: z.array(z.string().regex(REG_ID, "Invalid ID")),
});

export const schemaQuiz = z.object({
  quiz: z.array(schemaQuestion.nullable()),
});

export type FormQuizType = z.infer<typeof schemaQuiz>;
