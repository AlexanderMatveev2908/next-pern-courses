import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { GenericReq } from "@src/types/fastify.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getInfoConceptSvc } from "../services/getInfoConcept.js";

export const checkQuizMdw = async (req: FastifyRequest, res: FastifyReply) => {
  const {
    body: { quiz },
    params: { conceptID } = {},
  } = req as GenericReq;

  const { concept } = await getInfoConceptSvc(conceptID);

  if (!concept)
    return res.res400({
      msg: "concept not found",
    });
  if ((quiz ?? []).length !== concept.questions.length)
    return res.res409({
      msg: "Length of input and data in db does not correspond",
    });

  __cg("cpt", concept);
  __cg("b", quiz);

  return res.res200({
    concept,
  });
};
