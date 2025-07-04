import { FastifyInstance } from "fastify";
import { postCourse } from "../controllers/post.js";
import { logJSON } from "src/middleware/log.js";
import { wrapRoute } from "src/middleware/wrapRoute.js";
import { parseForm } from "src/middleware/multipart.js";
import { checkPostCourse } from "../middleware/postCourse.js";

export const coursesRouter = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/",
    config: {
      rateLimit: {
        max: 3,
        timeWindow: 1000 * 60,
      },
    },
    preHandler: [parseForm, wrapRoute(logJSON), checkPostCourse],
    handler: wrapRoute(postCourse),
  });
};
