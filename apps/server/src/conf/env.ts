import fp from "fastify-plugin";
import envPlugin from "@fastify/env";
import { FastifyInstance } from "fastify";
import { getPathENV } from "../lib/system/index.js";
import fs from "fs";

const schema = {
  type: "object",
  required: ["PORT", "HOST", "NODE_ENV"],
  properties: {
    PORT: { type: "number", default: 3000 },
    HOST: { type: "string", default: "0.0.0.0" },
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
  ...(fs.existsSync(p ?? "")
    ? {
        configPath: p,
      }
    : {}),
};

export default fp(async (app: FastifyInstance) => {
  await app.register(envPlugin, opt);
});
