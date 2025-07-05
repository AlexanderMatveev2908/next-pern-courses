import { formatDate } from "@shared/first/lib/formatters.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const forceWakeUp = async (req: FastifyRequest, res: FastifyReply) => {
  return res.res200({
    msg: "Ok i wake up",
    when: formatDate(Date.now()),
  });
};
