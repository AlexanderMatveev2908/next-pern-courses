import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { readSQL } from "@src/lib/system/index.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const courses = await db.$queryRawUnsafe(readSQL("get_courses"));

  // __cg("courses", courses);
  return res.res200({
    courses,
  });
};
