import { FastifyInstance } from "fastify";
import helloRouter from "../features/feature_0/routes/index.js";
import { coursesRouter } from "src/features/courses/routes/index.js";
import { decoratorsPlugin } from "../decorators/index.js";
import { corsPlugin } from "../middleware/cors.js";
import { multipartPlugin } from "src/middleware/multipart.js";
import { cookiePlugin } from "src/middleware/cookies.js";
import { catchErr } from "src/middleware/catchErr.js";
import { ratePlugin } from "src/middleware/rate.js";

export default async function router(app: FastifyInstance) {
  await app.register(catchErr);
  await app.register(corsPlugin);
  await app.register(ratePlugin);
  await app.register(decoratorsPlugin);
  await app.register(cookiePlugin);
  await app.register(multipartPlugin);

  app.register(helloRouter, { prefix: "/hello" });
  app.register(coursesRouter, { prefix: "/courses" });
}
