import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { wakeUpCtrl } from "../controllers/get.js";
import { forceWakeUp } from "../controllers/post.js";

export const wakeUpRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/",
    handler: wakeUpCtrl,
  });

  app.route({
    method: "POST",
    url: "/",
    handler: forceWakeUp,
  });
};
