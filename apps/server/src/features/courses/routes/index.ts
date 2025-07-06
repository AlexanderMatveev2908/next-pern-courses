import { FastifyInstance } from "fastify";
import { postCourse } from "../controllers/post.js";
import { logJSON } from "@src/middleware/log.js";
import { wrapRoute } from "@src/middleware/wrapRoute.js";
import { parseForm } from "@src/middleware/multipart.js";
import { checkPostCourse } from "../middleware/postCourse.js";
import { getListCoursesCtrl } from "../controllers/get.js";

export const coursesRouter = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/",
    config: {
      rateLimit: {
        max: 10,
        timeWindow: 1000 * 60 * 15,
      },
    },
    preHandler: [parseForm, wrapRoute(logJSON), checkPostCourse],
    handler: wrapRoute(postCourse),
  });

  app.route({
    method: "GET",
    url: "/",
    preHandler: [wrapRoute(logJSON)],
    handler: wrapRoute(getListCoursesCtrl),
  });
};
