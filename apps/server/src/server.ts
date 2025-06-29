import env from "./conf/env.js";
import Fastify from "fastify";
import router from "./routes/index.js";
import decorators from "./decorators/index.js";
import { sum } from "@shared/lib/index.js";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

sum();

const start = async () => {
  try {
    await app.register(env);

    await app.register(decorators);

    await app.register(router, {
      prefix: "/api/v1",
    });

    await app.listen({ port: app.env.PORT, host: app.env.HOST });

    console.log(app.printRoutes({ commonPrefix: false }));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
