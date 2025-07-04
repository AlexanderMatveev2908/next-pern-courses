import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { app_dir } from "@src/lib/system/index.js";
import fs from "fs";
import path from "path";

const logPath = path.resolve(app_dir, "logger", "data.json");
const logDir = path.dirname(logPath);

export const logJSON = async (req: FastifyRequest, _: FastifyReply) => {
  if (!fs.existsSync(logDir))
    await fs.promises.mkdir(logDir, { recursive: true });

  if (!fs.existsSync(logPath))
    await fs.promises.writeFile(logPath, JSON.stringify([]));

  const { myFormData } = req;

  await fs.promises.writeFile(
    logPath,
    JSON.stringify(
      {
        body: req.body ?? {},
        params: req.params ?? {},
        query: req.query ?? {},
        files: (myFormData?.files ?? []).map((f) => ({
          fieldname: f.fieldname,
          filename: f.filename,
          mimetype: f.mimetype,
          size: f.size,
          path: f.path,
        })),
        fields: myFormData?.fields ?? {},

        headers: req.headers?.authorization ?? "",
        refresh: req.cookies?.refreshToken ?? "",
      },
      null,
      2,
    ),
  );

  return;
};
