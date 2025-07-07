import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { __cg } from "@shared/first/lib/logger.js";

export const corsPlugin: FastifyPluginCallback = fp(
  async (app: FastifyInstance) => {
    const FRONT_URL = app.env.FRONT_URL;
    const FRONT_DEV = app.env.FRONT_URL_DEV;

    const whitelist = [FRONT_URL, FRONT_DEV].filter(Boolean);

    __cg("cors whitelist", whitelist);

    await app.register(cors, {
      credentials: true,
      origin: (origin, cb) => {
        __cg("cors origin", origin);

        if (!origin || whitelist.some((url) => origin.startsWith(url)))
          cb(null, true);
        else cb(new Error("Not allowed ⚔️"), false);
      },
    });
  },
);
