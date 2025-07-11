import { __cg } from "@shared/first/lib/logger.js";
import { isOkID } from "@shared/first/lib/validators.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const checkID =
  (key: string) => async (req: FastifyRequest, res: FastifyReply) => {
    const id = req.params?.[key as keyof typeof req.params];

    if (!isOkID(id))
      return res.res400({
        msg: "invalid id ⚔️",
      });
  };
