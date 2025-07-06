import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { readSQL } from "@src/lib/system/index.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  __cg("server count", readSQL("get_courses"));
  const courses = await db.$queryRawUnsafe(readSQL("get_courses"));

  return res.res200({
    courses,
  });
};
