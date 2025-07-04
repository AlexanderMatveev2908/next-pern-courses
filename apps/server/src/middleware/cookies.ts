import fp from "fastify-plugin";
import cookie from "@fastify/cookie";

export const cookiePlugin = fp(async (app) => {
  app.register(cookie, {
    secret: app.env.COOKIE_SECRET,
  });
});
