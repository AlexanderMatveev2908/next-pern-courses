import { Course } from "@prisma/client";
import db from "@src/conf/db.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const serviceGetCourseByID = async (id: string) => {
  const raw = sql`
    SELECT c.*,
    
     ${grabAssetsItem("COURSE")}

     FROM "Course" AS c

     WHERE c."id" = ${id}
    `;

  const courses: Course[] = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    course: courses?.[0] ?? null,
  };
};
