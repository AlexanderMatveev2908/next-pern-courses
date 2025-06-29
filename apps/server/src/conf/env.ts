import fp from "fastify-plugin";
import envPlugin from "@fastify/env";
import { FastifyInstance } from "fastify";

const schema = {
  type: "object",
  required: ["PORT", "HOST", "NODE_ENV"],
  properties: {
    PORT: { type: "number" },
    HOST: { type: "string" },
    NODE_ENV: { type: "string" },
  },
};

const opt = {
  confKey: "env",
  schema,
  dotenv: true,
};

export default fp(async (app: FastifyInstance) => {
  await app.register(envPlugin, opt);
});
