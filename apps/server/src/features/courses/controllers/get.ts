import { FastifyReply, FastifyRequest } from "fastify";

export const getListCoursesCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  return res.res200({});
};
