import { isOkID } from "@shared/first/lib/validators.js";
import { FastifyReply, FastifyRequest } from "fastify";

type ExistentIdToCheck = "courseID";

export const checkID =
  (key: ExistentIdToCheck) =>
  async (req: FastifyRequest, res: FastifyReply) => {
    const id = req.params?.[key as keyof typeof req.params];

    if (!isOkID(id))
      return res.res400({
        msg: "invalid id ⚔️",
      });
  };
