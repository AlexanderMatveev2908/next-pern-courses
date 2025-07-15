import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  const responses = {
    err400: { code: 400, defMsg: "Bad request" },
    err401: { code: 401, defMsg: "Unauthorized" },
    err403: { code: 403, defMsg: "Forbidden" },
    err404: { code: 404, defMsg: "Not found" },
    err409: { code: 409, defMsg: "Conflict" },
    err4022: { code: 422, defMsg: "Unprocessable entity" },
    err429: {
      code: 429,
      defMsg: "Our hamster-powered server took a break — try again later! 🐹",
    },
    err500: {
      code: 500,
      defMsg: "A wild slime appeared — the server took 30% damage! ⚔️",
    },
  } as const;

  for (const [name, { code, defMsg }] of Object.entries(responses)) {
    app.decorateReply(name, function <T>(this: FastifyReply, data?: T) {
      this.code(code);

      return this.send({
        ...(data ?? { msg: defMsg }),
      });
    });
  }
});
