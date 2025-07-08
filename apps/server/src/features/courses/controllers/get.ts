import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { readSQL } from "@src/lib/system/index.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myQuery } = req;

  const { limit, page } = myQuery as Record<string, any>;
  const offset = page * limit;
  const nHits = await db.course.count({
    where: {},
  });

  const pages = Math.ceil(nHits / limit);

  const courses = await db.$queryRawUnsafe(
    readSQL("get_courses"),
    offset,
    limit,
  );

  return res.res200({
    courses,
    pages,
    nHits,
  });
};
