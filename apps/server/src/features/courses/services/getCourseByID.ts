import { Course } from "@prisma/client";
import db from "@src/conf/db.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const serviceGetCourseByID = async (id: string) => {
  const raw = sql`
    SELECT c.*,
    
     ${grabAssetsItem("COURSE")},

      (
        SELECT json_agg(
          json_build_object(
            'id', cpt.id,
            'title', cpt.title,
            'description', cpt.description,
            'quizzes', (
              SELECT json_agg(
                json_build_object(
                  'id', q.id,
                  'title', q.title,
                  'question', q.question,
                  'variants', (
                    SELECT json_agg(
                      json_build_object(
                        'id', v.id,
                        'answer', v.answer,
                        'isCorrect', v."isCorrect"
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
