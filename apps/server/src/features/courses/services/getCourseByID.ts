import { Course } from "@prisma/client";
import db from "@src/conf/db.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const serviceGetCourseByID = async (id: string) => {
  const raw = sql`
    SELECT c.*,
    
     ${grabAssetsItem("COURSE")},

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
