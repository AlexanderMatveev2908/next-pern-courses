import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  app.get("/", (req, res) => {
    res.res500();
  });
});
