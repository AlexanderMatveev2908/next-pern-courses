import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { GenericReq } from "@src/types/fastify.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getInfoConceptSvc } from "../services/getInfoConcept.js";

export const checkQuizMdw = async (req: FastifyRequest, res: FastifyReply) => {
  const { body, params: { conceptID } = {} } = req as GenericReq;

  const concept = await getInfoConceptSvc(conceptID);

  __cg("cpt", concept);
  __cg("b", body);

  return res.res200({
    concept,
  });
};
