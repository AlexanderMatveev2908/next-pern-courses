import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  const successResponses = {
    res200: 200,
    res201: 201,
  } as const;

  for (const [name, status] of Object.entries(successResponses)) {
    app.decorateReply(name, function <
      T extends Record<string, any>,
    >(this: FastifyReply, data: T) {
      this.code(status);
      return this.send({ ...(data ?? {}) });
    });
  }

  app.decorateReply("res204", function (this: FastifyReply) {
    this.code(204).send();
  });
});
