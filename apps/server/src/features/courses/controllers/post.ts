import { FastifyReply, FastifyRequest } from "fastify";

export const postCourse = async (req: FastifyRequest, res: FastifyReply) => {
  return res.res200({
    msg: "new route",
  });
};
