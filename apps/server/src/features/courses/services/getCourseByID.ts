import { Course, EntityType } from "@prisma/client";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

const conceptsKeys = [
  "id",
  "title",
  "description",
  "markdown",
  "estimatedTime",
  "pointsGained",
  "order",
];
const quizKeys = ["id", "title", "question"];
const variantKeys = ["id", "answer", "isCorrect"];

export const serviceGetCourseByID = async (id: string) => {
  const raw = sql`
    SELECT c.*,
    
     ${grabAssetsItem("COURSE")},

      (
        SELECT json_agg(
          json_build_object(
            ${injectKeyValSQL(conceptsKeys, { prefix: "cpt" })},
            'images', (
                  SELECT json_agg(
                    json_build_object(
                      'url', ca."url",
                      'publicID', ca."publicID"
                    )
                  )
                  FROM "CloudAsset" AS ca
                  WHERE ca."type" = 'IMAGE'
                    AND ca."entityID" = cpt."id"
                    AND ca."entityType" = ${sql`${EntityType.CONCEPT}::"EntityType"`}
            ),
            'quizzes', (
              SELECT json_agg(
                json_build_object(
                 ${injectKeyValSQL(quizKeys, {
                   prefix: "q",
                 })},
                  'variants', (
                    SELECT json_agg(
                      json_build_object(
                       ${injectKeyValSQL(variantKeys, { prefix: "v" })}
                      )
                    )
                    FROM "Variant" v
                    WHERE v."quizID" = q.id
                  )
                )
              )
              FROM "Quiz" q
              WHERE q."conceptID" = cpt.id
            )
          )
        )
        FROM "Concept" cpt
        WHERE cpt."courseID" = c.id
      ) AS "concepts",


     json_build_object(
      'conceptsCount', 
        (
          SELECT COUNT(*)::INT
          FROM "Concept" AS cpt
          WHERE cpt."courseID" = ${id}
        )
     ) AS "conceptsStats"

     FROM "Course" AS c

     WHERE c."id" = ${id}

    `;

  const courses: Course[] = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    course: courses?.[0] ?? null,
  };
};
