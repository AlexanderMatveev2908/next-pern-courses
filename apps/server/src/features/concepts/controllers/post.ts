import { FastifyReply, FastifyRequest } from "fastify";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  return res.res201({
    msg: "Concept added",
  });
};
