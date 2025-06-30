import env from "./conf/env.js";
import Fastify from "fastify";
import router from "./routes/index.js";
import decorators from "./decorators/index.js";
import db from "./conf/db.js";
import { doStuff, doStuffB } from "./dev_only/index.js";
import { __cg } from "@shared/first/lib/logger.js";
import { sum } from "@shared/first/lib/index.js";

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

// doStuff();
// doStuffB();

const start = async () => {
  try {
    await app.register(env);
    await app.register(decorators);
    await app.register(router, {
      prefix: "/api/v1",
    });

    await db.$connect();

    await app.listen({ port: app.env.PORT, host: app.env.HOST });

    __cg("[DEBUG] Starting Fastify on", app.env);
  } catch (err) {
    await db.$disconnect();
    app.log.error(err);
    process.exit(1);
  }
};

start();
