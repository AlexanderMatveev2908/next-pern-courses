import { FastifyInstance } from "fastify";
import { postCourse } from "../controllers/post.js";

export const coursesRouter = async (app: FastifyInstance) => {
  app.post("/", postCourse);
};
