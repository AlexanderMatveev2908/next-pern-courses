import { FastifyInstance } from "fastify";
import { postCourse } from "../controllers/post.js";
import { logJSON } from "src/middleware/log.js";
import { wrapRoute } from "src/middleware/wrapRoute.js";

export const coursesRouter = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/",
    preHandler: [wrapRoute(logJSON)],
    handler: wrapRoute(postCourse),
  });
};
