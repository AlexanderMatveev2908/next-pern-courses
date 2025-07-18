import { logJSON } from "@src/middleware/log.js";
import { checkID } from "@src/middleware/validators/checkID.js";
import { wrapRoute } from "@src/middleware/wrapRoute.js";
import { FastifyInstance } from "fastify";
import {
  getConceptByIDCtrl,
  getMinInfoCourseByID,
  getSummaryConceptsByCourse,
} from "../controllers/get.js";
import { parseForm } from "@src/middleware/multipart/multipart.js";
import { checkQuizCtrl, postCourseCtrl } from "../controllers/post.js";
import { postConceptMdw } from "../middleware/postConcept.js";
import { checkQuizMdw } from "../middleware/checkQuiz.js";
import { parseQuery } from "@src/middleware/parseQuery.js";

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
    preHandler: [
      wrapRoute(parseForm),
      checkID("courseID"),
      wrapRoute(logJSON),
      postConceptMdw,
    ],
    handler: wrapRoute(postCourseCtrl),
  });

  app.route({
    method: "GET",
    url: "/:conceptID",
    preHandler: [checkID("conceptID")],
    handler: wrapRoute(getConceptByIDCtrl),
  });

  app.route({
    method: "POST",
    url: "/check/:conceptID",
    preHandler: [wrapRoute(logJSON), checkID("conceptID"), checkQuizMdw],
    handler: wrapRoute(checkQuizCtrl),
  });

  app.route({
    method: "GET",
    url: "/summary/:courseID",
    preHandler: [parseQuery, logJSON, checkID("courseID")],
    handler: wrapRoute(getSummaryConceptsByCourse),
  });
};
