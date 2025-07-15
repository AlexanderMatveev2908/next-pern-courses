import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const wrapRoute =
  (cbAPI: (req: FastifyRequest, res: FastifyReply) => Promise<any>) =>
  async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      await cbAPI(req, res);
    } catch (err: any) {
      __cg("err wrap route", err?.msg ?? err?.message);

      return res.err500({
        msg: err?.msg ?? err?.message,
      });
    }
  };
