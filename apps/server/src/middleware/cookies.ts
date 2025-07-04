import fp from "fastify-plugin";
import cookie from "@fastify/cookie";
import { FastifyPluginCallback } from "fastify";

export const cookiePlugin: FastifyPluginCallback = fp(async (app) => {
  app.register(cookie, {
    secret: app.env.COOKIE_SECRET,
  });
});
