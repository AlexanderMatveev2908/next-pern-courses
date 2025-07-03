import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance) => {
  const FRONT_URL = app.env.FRONT_URL;
  const FRONT_DEV = app.env.FRONT_URL_DEV;

  const whitelist = [FRONT_URL, FRONT_DEV].filter(Boolean);

  await app.register(cors, {
    credentials: true,
    origin: (origin, cb) => {
      console.log(origin);
      if (!origin || whitelist.includes(origin)) cb(null, true);
      else cb(null, false);
    },
  });
});
