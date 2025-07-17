import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { handleRawSQL } from "../services/getCoursesList.js";
import { serviceGetCourseByID } from "../services/getCourseByID.js";
import { getSummaryCoursesSvc } from "../services/getSummaryCourses.js";

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

export const getCourseByID = async (req: FastifyRequest, res: FastifyReply) => {
  const {
    params: { courseID },
  } = req as { params: { courseID: string } };

  const { course } = await serviceGetCourseByID(courseID);

  if (!course)
    return res.err404({
      msg: "Course not found",
    });

  return res.res200({ msg: "here u are the course", course });
};

export const getCoursesSummary = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { summary } = await getSummaryCoursesSvc(req);

  return res.res200({
    msg: "Here u are the summary...",
    summary,
  });
};
