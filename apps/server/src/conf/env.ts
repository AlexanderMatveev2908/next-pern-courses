import fp from "fastify-plugin";
import envPlugin from "@fastify/env";
import { FastifyInstance } from "fastify";
import { getPathENV } from "../lib/system/index.js";

const schema = {
  type: "object",
  required: ["PORT", "HOST", "NODE_ENV"],
  properties: {
    PORT: { type: "number" },
    HOST: { type: "string" },
    NODE_ENV: { type: "string" },
    FRONT_URL: { type: "string" },
    FRONT_URL_DEV: { type: "string" },
    COOKIE_SECRET: { type: "string" },
    CLOUDINARY_NAME: { type: "string" },
    CLOUDINARY_API_KEY: { type: "string" },
    CLOUDINARY_API_SECRET: { type: "string" },
  },
};

const p = getPathENV();

const opt = {
  confKey: "env",
  schema,
  ...(p
    ? {
        configPath: p,
      }
    : {}),
};

export default fp(async (app: FastifyInstance) => {
  await app.register(envPlugin, opt);
});
