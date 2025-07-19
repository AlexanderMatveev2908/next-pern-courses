import env from "./conf/env.js";
import Fastify from "fastify";
import { router } from "./routes/index.js";
import db from "./conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";
import { DEL_ALL } from "./dev_only/danger.js";
import { genMock } from "./dev_only/mock/genMock.js";
import { v4 } from "uuid";

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

// __cg("v4", v4());

// DEL_ALL();

//  !  120s time required (sometimes server crash for connection database during promises)
// genMock();

process.on("SIGTERM", () => {
  app.close(() => {
    console.log("Server closed on SIGTERM");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  app.close(() => {
    console.log("Server closed on SIGINT");
    process.exit(0);
  });
});

const start = async () => {
  try {
    await app.register(env);
    await app.register(router, {
      prefix: "/api/v1",
    });

    await db.$connect();

    await app.listen({ port: app.env.PORT, host: app.env.HOST });

    __cg(`=> server running on ${app.env.PORT}`);
  } catch (err: any) {
    __cg("catch main err ☢️", err.message);

    await db.$disconnect();
    // app.log.error(err);
    process.exit(1);
  }
};

start();
