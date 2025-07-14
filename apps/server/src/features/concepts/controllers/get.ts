import { FastifyReply, FastifyRequest } from "fastify";
import { getInfoCourseSvc } from "../services/getCourseInfo.js";
import { getConceptByIDSvc } from "../services/getConceptByID.js";

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
  const {
    params: { conceptID },
  } = req as {
    params: {
      conceptID: String;
    };
  };

  const { concept } = await getConceptByIDSvc(conceptID as string);

  if (!concept)
    return res.res404({
      msg: "Concept not found",
    });

  return res.res200({
    msg: "her u are the cpt",
    concept,
  });
};
