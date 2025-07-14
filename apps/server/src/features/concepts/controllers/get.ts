import { FastifyReply, FastifyRequest } from "fastify";
import { getInfoCourseSvc } from "../services/getCourseInfo.js";

export const getMinInfoCourseByID = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const {
    params: { courseID },
  } = req as { params: { courseID: string } };

  const { course } = await getInfoCourseSvc(courseID);

  return res.res200({ msg: "course info", course });
};

export const getConceptByIDCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  return res.res200({
    msg: "her u are the cpt",
  });
};
