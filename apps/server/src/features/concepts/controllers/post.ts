import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFancyForm } = req;

  __cg("fancy", myFancyForm);

  return res.res201({
    msg: "Concept added",
  });
};
