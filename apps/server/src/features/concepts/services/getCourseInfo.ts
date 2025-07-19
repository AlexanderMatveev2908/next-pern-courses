import { Course } from "@prisma/client";
import db from "@src/conf/db.js";
import sql from "sql-template-tag";

export const getInfoCourseSvc = async (id: string) => {
  const raw = sql`

    WITH stats AS (
        SELECT
            COUNT(*)::INT AS "conceptsCount",
            COALESCE(SUM("estimatedTime"), 0)::INT AS "conceptsTime",
            COALESCE(SUM("pointsGained"), 0)::INT AS "conceptsPoints"
        FROM "Concept"
        WHERE "courseID" = ${id}
    )

    SELECT c."id", c."title",

    JSON_BUILD_OBJECT(
        'conceptsCount', stats."conceptsCount",
        'conceptsTime', stats."conceptsTime",
        'conceptsPoints', stats."conceptsPoints"
    ) AS "conceptsStats"

    FROM "Course" AS c, stats
    WHERE c.id = ${id}
    LIMIT 1
    `;

  const [course] = await db.$queryRawUnsafe<Course[]>(raw.text, ...raw.values);

  return { course };
};
