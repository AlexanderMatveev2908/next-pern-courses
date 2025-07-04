import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  const responses = {
    res400: { code: 400, defMsg: "Bad request" },
    res401: { code: 401, defMsg: "Unauthorized" },
    res403: { code: 403, defMsg: "Forbidden" },
    res404: { code: 404, defMsg: "Not found" },
    res409: { code: 409, defMsg: "Conflict" },
    res422: { code: 422, defMsg: "Unprocessable entity" },
    res429: {
      code: 429,
      defMsg: "Our hamster-powered server took a break — try again later! 🐹",
    },
    res500: {
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
