import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  app.decorateReply("res400", function <T>(this: FastifyReply, data?: T) {
    this.code(400);
    return this.send({
      data: data ?? {
        msg: "Bad request",
      },
    });
  });

  app.decorateReply("res401", function <T>(this: FastifyReply, data?: T) {
    this.code(401);
    return this.send({
      data: data ?? {
        msg: "Unauthorized",
      },
    });
  });

  app.decorateReply("res403", function <T>(this: FastifyReply, data?: T) {
    this.code(403);
    return this.send({
      data: data ?? {
        msg: "Forbidden",
      },
    });
  });

  app.decorateReply("res404", function <T>(this: FastifyReply, data?: T) {
    this.code(404);
    return this.send({
      data: data ?? {
        msg: "Not found",
      },
    });
  });

  app.decorateReply("res409", function <T>(this: FastifyReply, data?: T) {
    this.code(409);
    return this.send({
      data: data ?? {
        msg: "Conflict",
      },
    });
  });

  app.decorateReply("res422", function <T>(this: FastifyReply, data?: T) {
    this.code(422);
    return this.send({
      data: data ?? {
        msg: "Unprocessable entity",
      },
    });
  });

  app.decorateReply("res429", function <T>(this: FastifyReply, data?: T) {
    this.code(429);
    return this.send({
      data: data ?? {
        msg: "Our hamster-powered server took a break — try again later! 🐹",
      },
    });
  });

  app.decorateReply("res500", function <T>(this: FastifyReply, data?: T) {
    this.code(500);
    return this.send({
      data: data ?? {
        msg: "A wild slime appeared — the server took 30% damage! ⚔️",
      },
    });
  });
});
