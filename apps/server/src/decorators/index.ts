import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import decorateSuccess from "./res/success.js";
import decorateError from "./res/error.js";

export const decoratorsPlugin = fp(async (app: FastifyInstance) => {
  decorateSuccess(app);
  decorateError(app);
});
