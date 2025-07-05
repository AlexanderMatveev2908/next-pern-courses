import { FastifyReply, FastifyRequest } from "fastify";

export const wakeUpCtrl = async (req: FastifyRequest, res: FastifyReply) => {
  return res.res200({
    msg: "Ops, I did not listen the alarm 💤",
  });
};
