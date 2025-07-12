import { FastifyReply, FastifyRequest } from "fastify";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  return res.res200({
    msg: "Concept added",
  });
};
