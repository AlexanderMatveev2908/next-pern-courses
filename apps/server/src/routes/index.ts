import { FastifyInstance } from "fastify";
import helloRouter from "../features/feature_0/routes/index.js";
import { coursesRouter } from "@src/features/courses/routes/index.js";
import { decoratorsPlugin } from "../decorators/index.js";
import { corsPlugin } from "../middleware/cors.js";
import { multipartPlugin } from "@src/middleware/multipart/multipart.js";
import { cookiePlugin } from "@src/middleware/cookies.js";
import { catchErr } from "@src/middleware/catchErr.js";
import { ratePlugin } from "@src/middleware/rate.js";
import { wakeUpRoute } from "@src/features/wakeUp/routes/index.js";
import { conceptsRouter } from "@src/features/concepts/routes/index.js";
import { routerProxy } from "@src/features/proxy/router/index.js";

export const router = async (app: FastifyInstance) => {
  app.register(catchErr);
  app.register(corsPlugin);
  app.register(ratePlugin);
  app.register(decoratorsPlugin);
  app.register(cookiePlugin);
  app.register(multipartPlugin);

  // ! delete this route at end dev ☢️
  app.register(routerProxy, { prefix: "/proxy" });

  app.register(helloRouter, { prefix: "/hello" });
  app.register(coursesRouter, { prefix: "/courses" });
  app.register(wakeUpRoute, { prefix: "/wake-up" });
  app.register(conceptsRouter, { prefix: "/concepts" });
};
