import { REG_INTEGER } from "@shared/first/constants/regex.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { parseTxtSql } from "@src/lib/sql.js";
import { sqlStrImages } from "@src/services/grabAssetsItem.js";
import { FastifyRequest } from "fastify";
import sql from "sql-template-tag";

export const getSummaryConceptsSvc = async (req: FastifyRequest) => {
  const { params: { courseID } = {}, myQuery } = req as any;

  let title = myQuery?.title;
  if (REG_INTEGER.test(title)) title = title + "";
  const splitted = parseTxtSql(title);

  const raw = sql`
     SELECT cpt.id , cpt.title, cpt."courseID",

     ${sqlStrImages("CONCEPT", { prefix: "cpt" })} images

     FROM "Concept" cpt
     WHERE cpt."courseID" = ${courseID}
     AND ${
       !isArrOK(splitted)
         ? sql`TRUE`
         : sql([
             splitted!.map((str) => `cpt.title ILIKE '${str}'`).join("\n AND "),
           ])
     }
    `;

  const summary = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    summary,
  };
};
