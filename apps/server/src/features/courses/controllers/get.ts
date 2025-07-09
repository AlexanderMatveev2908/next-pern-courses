import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { getCoursesGenSQL } from "../services/getCoursesList.js";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { sql, nHits, pages } = await getCoursesGenSQL(req);

  const courses = await db.$queryRawUnsafe(sql);

  return res.res200({
    courses,
    pages,
    nHits,
  });
};
