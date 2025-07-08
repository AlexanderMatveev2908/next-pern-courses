import { formatDate } from "@shared/first/lib/formatters.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { v4 } from "uuid";

export const wakeUpCtrl = async (req: FastifyRequest, res: FastifyReply) => {
  return res.res200({
    msg: "Ops, I did not listen the alarm 💤",
    when: formatDate(Date.now()),
  });
};

export const getDummyList = async (req: FastifyRequest, res: FastifyReply) => {
  __cg("getDummyList");

  return res.res200({
    items: Array.from({ length: 15 }, (_, i) => ({
      id: v4(),
      val: i,
    })),
    when: formatDate(Date.now()),
    msg: "Data is ready",
  });
};
