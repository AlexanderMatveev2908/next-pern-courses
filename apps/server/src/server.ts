import env from "./conf/env.js";
import Fasfy from "fastify";
import router from "./routes/index.js";
import db from "./conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";
import { DEL_ALL } from "./dev_only/danger.js";

const app = Fastify({
  logger: {
    level: "warn",
    // transport: {
    //   target: "pino-pretty",
    //   options: {
    //     colorize: true,
    //     translateTime: "HH:MM:ss Z",
    //     ignore: "pid,hostname",
    //   },
    // },
  },
});

// DEL_ALL();

const start = async () => {
  try {
    await app.register(env);
    await app.register(router, {
      prefix: "/api/v1",
    });

    await db.$connect();

    await app.listen({ port: app.env.PORT, host: app.env.HOST });

    __cg(`=> server running on ${app.env.PORT}`);
  } catch (err) {
    await db.$disconnect();
    app.log.error(err);
    process.exit(1);
  }
};

start();
