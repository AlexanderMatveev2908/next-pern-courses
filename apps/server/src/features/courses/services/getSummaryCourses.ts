import { sqlStrImages } from "@src/services/grabAssetsItem.js";
import { FastifyRequest } from "fastify";
import sql from "sql-template-tag";
import { GenericReq } from "@src/types/fastify.js";
import db from "@src/conf/db.js";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";

export const getSummaryCoursesSvc = async (req: FastifyRequest) => {
  const { params: { courseID } = {} } = req as GenericReq;

  const raw = sql`
    SELECT c.id, c.title,

    ${sqlStrImages("COURSE", { prefix: "c" })} images

    FROM "Course" c
    WHERE TRUE
    `;

  const summary = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    summary,
  };
};

/*
  const raw = sql`
    SELECT c.id, c.title,

    ${sqlStrImages("COURSE", { prefix: "c" })} images,

    (
      SELECT CASE 
        WHEN ${
          !isStr(courseID)
            ? sql`TRUE`
            : sql`
        c.id = ${courseID}
        `
        }
          THEN
           (SELECT COALESCE(JSON_AGG(ROW_TO_JSON(processed_concepts)), '[]'::JSON)
            FROM (
                SELECT cpt.id, cpt.title
                FROM "Concept" cpt
                WHERE cpt."courseID" = c.id  
            ) processed_concepts)
           ELSE NULL
           END
    ) concepts

    FROM "Course" c
    WHERE TRUE
    `;*/
