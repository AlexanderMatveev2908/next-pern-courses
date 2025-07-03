import { FastifyInstance } from "fastify";
import helloRouter from "../features/feature_0/routes/index.js";
import { coursesRouter } from "src/features/courses/routes/index.js";

export default async function router(app: FastifyInstance) {
  app.register(helloRouter, { prefix: "/hello" });
  app.register(coursesRouter, { prefix: "/courses" });
}
