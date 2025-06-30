import { FastifyInstance } from "fastify";

const helloRouter = async (app: FastifyInstance) => {
  app.get("/", async (req, res) => {
    return res.res200({ message: "Hello buddy" });
  });
};

export default helloRouter;
