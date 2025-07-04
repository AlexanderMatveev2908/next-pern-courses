import { FastifyReply, FastifyRequest } from "fastify";

export const wrapRoute =
  (cbAPI: (req: FastifyRequest, res: FastifyReply) => Promise<any>) =>
  async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      await cbAPI(req, res);
    } catch (error) {
      return res.res500();
    }
  };
