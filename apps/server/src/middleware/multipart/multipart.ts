import fp from "fastify-plugin";
import multipart from "@fastify/multipart";
import { FastifyPluginCallback, FastifyRequest } from "fastify";
import { AppFile } from "@src/types/fastify.js";
import fs from "fs";
import path from "path";
import { app_dir } from "@src/lib/system/index.js";
import { v4 } from "uuid";

export const multipartPlugin: FastifyPluginCallback = fp(async (app) => {
  app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
});

export const parseForm = async (req: FastifyRequest) => {
  const fields: Record<string, any> = {};
  const files: AppFile[] = [];

  for await (const part of req.parts()) {
    if (part.type === "file") {
      const buffer = await part.toBuffer();

      const originalname = part.filename || "unknown";
      const ext = path.extname(originalname);
      const safeName = v4() + ext;

      const fileData = {
        fieldname: part.fieldname,
        filename: safeName,
        mimetype: part.mimetype,
        size: buffer.length,
        buffer,
      };

      if (fileData.mimetype.startsWith("video/")) {
        const uploadDir = path.resolve(app_dir, "uploads", "videos");
        const helperRead = path.resolve(app_dir, "uploads", "_");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, {
            recursive: true,
          });
          fs.mkdirSync(helperRead, {
            recursive: true,
          });
        }

        const filePath = path.join(uploadDir, fileData.filename);
        await fs.promises.writeFile(filePath, buffer);

        files.push({
          ...fileData,
          buffer: null,
          path: filePath,
        });
      } else {
        files.push(fileData);
      }
    } else if (part.type === "field") {
      const key = part.fieldname;
      const val = part.value;

      if (fields[key]) {
        fields[key] = [
          ...(Array.isArray(fields[key]) ? fields[key] : [fields[key]]),
          val,
        ];
      } else {
        fields[key] = val;
      }
    }
  }

  req.myFormData = {
    fields,
    files,
  };
};
