import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { GenericReq } from "@src/types/fastify.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getInfoConceptSvc } from "../services/getInfoConcept.js";
import { checkZod } from "@src/middleware/validators/zodCheck.js";
import { schemaQuiz } from "@shared/first/paperwork/concepts/schema.quiz.js";

export const checkQuizMdw = async (req: FastifyRequest, res: FastifyReply) => {
  const { body, params: { conceptID } = {} } = req as GenericReq;
  const { quiz } = body;

  const { isOK, fancyErrsList, msg } = await checkZod(body, {
    schema: schemaQuiz,
  });
  if (!isOK)
    return res.err422({
      msg,
      fancyErrsList,
    });

  const { concept } = await getInfoConceptSvc(conceptID);

  if (!concept)
    return res.err400({
      msg: "concept not found",
    });

  const uniqueIDs = new Set(quiz.map((q: any) => q.questionID));

  if (uniqueIDs.size !== concept.questions.length)
    return res.err409({
      msg: "Length of input and data in db does not correspond",
    });

  const shape = new Map(
    concept.questions.map((q) => [
      q.id,
      q.variants.map((vrt) => ({
        id: vrt.id,
        asw: vrt.answer,
      })),
    ]),
  );

  for (const inputQ of quiz) {
    if (!shape.get(inputQ.questionID))
      return res.err409({ msg: "question does not exists" });

    for (const inputID of inputQ.answerIDs) {
      if (!shape.get(inputQ.questionID)!.find((el) => el.id === inputID))
        return res.err400({
          msg: "Answers do not correspond to existent data expected",
        });
    }
  }
};
