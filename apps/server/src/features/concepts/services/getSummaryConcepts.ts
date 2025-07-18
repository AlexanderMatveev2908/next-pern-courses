import db from "@src/conf/db.js";
import { sqlStrImages } from "@src/services/grabAssetsItem.js";
import { GenericReq } from "@src/types/fastify.js";
import { FastifyRequest } from "fastify";
import sql from "sql-template-tag";

export const getSummaryConceptsSvc = async (req: FastifyRequest) => {
  const {
    params: { courseID },
  } = req as GenericReq;

  const raw = sql`
     SELECT cpt.id , cpt.title, cpt."courseID",

     ${sqlStrImages("CONCEPT", { prefix: "cpt" })} images

     FROM "Concept" cpt
     WHERE cpt."courseID" = ${courseID}
    `;

  const summary = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    summary,
  };
};
