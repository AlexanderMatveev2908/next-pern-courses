import { FastifyReply, FastifyRequest } from "fastify";

export const wrapRoute =
  (cbAPI: (req: FastifyRequest, res: FastifyReply) => Promise<any>) =>
  async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      await cbAPI(req, res);
    } catch (err: any) {
      return res.res500({
        msg: err?.msg ?? err?.message,
      });
    }
  };
