import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { handleRawSQL } from "../services/getCoursesList.js";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { nHits, pages, courses } = await handleRawSQL(req);

  return res.res200({
    courses,
    pages,
    nHits,
  });
};
