import { Course } from "@prisma/client";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import sql from "sql-template-tag";

export const getInfoCourseSvc = async (id: string) => {
  const raw = sql`

    WITH stats AS (
        SELECT
            COUNT(*) AS "conceptsCount",
            COALESCE(SUM("estimatedTime"), 0)::INT AS "conceptsTime"
        FROM "Concept"
        WHERE "courseID" = ${id}
    )

    SELECT c."id", c."title",

    json_build_object(
        'conceptsCount', stats."conceptsCount",
        'conceptsTime', stats."conceptsTime"
    ) AS "conceptsStats"

    FROM "Course" AS c, stats
    WHERE c.id = ${id}
    LIMIT 1
    `;

  const [course] = await db.$queryRawUnsafe<Course[]>(raw.text, ...raw.values);

  __cg("data");

  return { course };
};
