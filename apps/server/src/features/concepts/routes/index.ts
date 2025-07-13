import { logJSON } from "@src/middleware/log.js";
import { checkID } from "@src/middleware/validators/checkID.js";
import { wrapRoute } from "@src/middleware/wrapRoute.js";
import { FastifyInstance } from "fastify";
import { getMinInfoCourseByID } from "../controllers/get.js";
import { parseForm } from "@src/middleware/multipart/multipart.js";
import { postCourseCtrl } from "../controllers/post.js";
import { postConceptMdw } from "../middleware/postConcept.js";

export const conceptsRouter = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/course-stats/:courseID",
    preHandler: [wrapRoute(logJSON), checkID("courseID")],
    handler: wrapRoute(getMinInfoCourseByID),
  });

  app.route({
    method: "POST",
    url: "/:courseID",
    preHandler: [wrapRoute(parseForm), wrapRoute(logJSON), postConceptMdw],
    handler: wrapRoute(postCourseCtrl),
  });
};
