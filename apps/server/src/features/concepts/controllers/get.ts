import { FastifyReply, FastifyRequest } from "fastify";

export const getMinInfoCourseByID = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  return res.res200({ msg: "course info" });
};
