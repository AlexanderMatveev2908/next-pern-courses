import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  app.decorateReply("res200", function <T>(this: FastifyReply, data: T) {
    this.code(200);

    return this.send({ data });
  });

  app.decorateReply("res201", function <T>(this: FastifyReply, data: T) {
    this.code(200);

    return this.send({ data });
  });

  app.decorateReply("res204", function <T>(this: FastifyReply) {
    this.code(204).send();
  });
});
