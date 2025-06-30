import { FastifyInstance } from "fastify";
import helloRouter from "../features/feature_0/routes/index.js";

export default async function router(app: FastifyInstance) {
  app.register(helloRouter, { prefix: "/hello" });
}
