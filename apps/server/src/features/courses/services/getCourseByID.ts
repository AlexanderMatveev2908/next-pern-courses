import { Course } from "@prisma/client";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import { grabAssetsItem, sqlStrImages } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";
import { objKeysConcept } from "../lib/sqlData.js";

export const serviceGetCourseByID = async (id: string) => {
  const raw = sql`
  SELECT c.*,

   ${grabAssetsItem("COURSE", { prefix: "c" })},

  (
    SELECT COALESCE(
      json_agg(
        json_build_object(
          ${injectKeyValSQL(objKeysConcept.concept, { prefix: "cpt" })},
          'hasVideo', (
            SELECT EXISTS (
              SELECT 1 
              FROM "CloudAsset" ca
              WHERE ca."entityID" = cpt.id
              AND ca.type = 'VIDEO'::"TypeAsset"
              AND ca."entityType" = 'CONCEPT'::"EntityType"
            )
          ),
          'images', ${sqlStrImages("CONCEPT", { prefix: "cpt" })},
          'quizzes', (
            SELECT COALESCE(
              json_agg(
                json_build_object(
                  ${injectKeyValSQL(objKeysConcept.quiz, { prefix: "q" })},
                  'variants', (
                    SELECT COALESCE(
                      json_agg(
                        json_build_object(
                          ${injectKeyValSQL(objKeysConcept.variant, { prefix: "v" })}
                        )
                      ), '[]'::JSON
                    )
                    FROM "Variant" v
                    WHERE v."quizID" = q.id
                  )
                )
              ), '[]'::JSON
            )
            FROM "Quiz" q
            WHERE q."conceptID" = cpt.id
          )
        )
      ORDER BY cpt."order" ASC
      ), '[]'::JSON
    )
    FROM "Concept" cpt
    WHERE cpt."courseID" = c.id
  ) concepts,

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

// const raw = sql`
// SELECT c.*,

//  ${grabAssetsItem("COURSE")},

//  json_agg(
//   json_build_object(
//     ${injectKeyValSQL(conceptsKeys, { prefix: "cpt" })},
//     'images', ${sqlStrImages("CONCEPT", { prefix: "cpt" })},
//     'quizzes', json_agg(
//       json_build_object(
//         ${injectKeyValSQL(quizKeys, { prefix: "q" })}
//       )
//     )
//   )
//  ) concepts,

//  json_build_object(
//   'conceptsCount',
//     (
//       SELECT COUNT(*)::INT
//       FROM "Concept" AS cpt
//       WHERE cpt."courseID" = ${id}
//     )
//  ) AS "conceptsStats"

//  FROM "Course" c
//  LEFT JOIN "Concept" cpt
//  ON cpt."courseID" = c.id
//  LEFT JOIN "Quiz" q
//  ON q."conceptID" = cpt.id

//  WHERE c.id = ${id}
//  GROUP BY c.id

// `;
