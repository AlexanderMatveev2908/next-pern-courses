import { ConceptType } from "@/features/concepts/types";
import { schemaQuiz } from "@shared/first/paperwork/concepts/schema.quiz.js";

type Params = {
  concept: ConceptType;
};

export const useExtendSchemaQuiz = ({ concept }: Params) => {
  const syncSchema = schemaQuiz.extend({}).superRefine((data, ctx) => {
    if (concept.refs?.prev && !concept.refs.prev.isCompleted)
      ctx.addIssue({
        code: "custom",
        path: ["quiz"],
        message: "You should first finish previous concept",
      });

    if ((data.quiz.length ?? 0) < concept.questions.length)
      ctx.addIssue({
        code: "custom",
        path: ["quiz"],
        message: "Quiz is not finished",
      });

    let i = 0;

    while (i < (data.quiz?.length ?? 0)) {
      const curr = data.quiz[i];

      if (!curr?.answerIDs?.length)
        ctx.addIssue({
          code: "custom",
          path: [`quiz.${i}.answerIDs`],
          message: `question idx ${i} need answer`,
        });

      if ((curr?.answerIDs.length ?? 0) > 1)
        ctx.addIssue({
          code: "custom",
          path: [`quiz.${i}.answerIDs`],
          message: `question idx ${i} has too many answers`,
        });

      i++;
    }
  });

  return { syncSchema };
};
