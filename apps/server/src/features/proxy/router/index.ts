import { FastifyInstance } from "fastify";
import { grabAssetsBlob, grabImages } from "../controller/get.js";
import { wrapRoute } from "@src/middleware/wrapRoute.js";

export const routerProxy = async (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "GET",
    handler: wrapRoute(grabImages),
  });

  app.route({
    url: "/blob",
    method: "GET",
    handler: wrapRoute(grabAssetsBlob),
  });
};
