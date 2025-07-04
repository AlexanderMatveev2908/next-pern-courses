import fp from "fastify-plugin";
import multipart, { MultipartFile } from "@fastify/multipart";
import { FastifyRequest } from "fastify";
import { __cg } from "@shared/first/lib/logger.js";
import { AppFile } from "src/types/fastify.js";

export const multipartPlugin = fp(async (app) => {
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
      files.push({
        fieldname: part.fieldname,
        filename: part.filename,
        mimetype: part.mimetype,
        size: buffer.length,
        buffer,
      });
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

  // console.log("fields", fields);
  console.log("files", files);

  return { fields, files };
};
