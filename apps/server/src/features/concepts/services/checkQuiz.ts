import { Concept, UserAnswer } from "@prisma/client";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";

export const checkQuizSvc = async ({
  concept,
  userAnswersArg,
  fancyScore,
}: {
  concept: Concept;
  userAnswersArg: Partial<UserAnswer>[];
  fancyScore: number;
}) => {
  const result = await db.$transaction(async (trx) => {
    const othersConcepts = await trx.concept.findMany({
      where: {
        courseID: concept.courseID,
        NOT: {
          id: concept.id,
        },
      },
      select: {
        id: true,
        isCompleted: true,
      },
    });

    if (othersConcepts.every((cpt) => cpt.isCompleted))
      await trx.course.update({
        where: {
          id: concept.courseID,
        },
        data: {
          isCompleted: true,
        },
      });

    await trx.concept.update({
      where: {
        id: concept.id,
      },
      data: {
        isCompleted: true,
      },
    });

    const userConcept = await trx.userConcept.create({
      data: {
        conceptID: concept.id,
        score: fancyScore,
      },
    });

    const answersUserCreated = await trx.userAnswer.createMany({
      data: userAnswersArg.map(
        (asw) =>
          ({
            isCorrect: asw.isCorrect!,
            questionID: asw.questionID!,
            variantID: asw.variantID!,
            userConceptID: userConcept.id,
          }) as UserAnswer,
      ),
    });

    return {
      ...userConcept,
      userAnswers: answersUserCreated,
    };
  });

  return result;
};
