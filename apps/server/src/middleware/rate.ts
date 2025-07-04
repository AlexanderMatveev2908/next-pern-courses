import rateLimit from "@fastify/rate-limit";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

export const ratePlugin: FastifyPluginCallback = fp((app: FastifyInstance) =>
  app.register(rateLimit, {
    global: false,
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
    },
    errorResponseBuilder: () => {
      return {
        statusCode: 429,
        error: "Too Many Requests",
        message: `Our hamster-powered server took a break — try again later! 🐹`,
      };
    },
  }),
);
