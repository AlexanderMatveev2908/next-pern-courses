import { isStr } from "@shared/first/lib/dataStructure.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { schemaPostCourseServer } from "../paperwork/postCourse.js";
import { __cg } from "@shared/first/lib/logger.js";
import fs from "fs";

export const checkPostCourse = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData } = req;

  if (!myFormData) return res.res422({ msg: "missing form at all" });

  const { fields, files } = myFormData;

  const normalized = {
    ...fields,
    tags: Array.isArray(fields.tags)
      ? fields.tags.map((tag) => JSON.parse(tag)).filter((el) => isStr(el.val))
      : [],
    imageFiles: files.filter((f) => f.mimetype.startsWith("image/")),
    videoFile: files.find((f) => f.mimetype.startsWith("video/")),
  };

  const result = schemaPostCourseServer.safeParse(normalized);

  if (result.error) {
    const fancyErr = result.error.format();
    const msg =
      fancyErr._errors[0] ??
      Object.values(fancyErr)
        .flatMap((errs) => (errs as any)?._errors)
        .filter(Boolean)[0];

    if (isStr(normalized.videoFile?.path))
      try {
        await fs.promises.unlink(normalized!.videoFile!.path!);

        __cg("success local delete");
      } catch (err) {
        __cg("fail local delete");
      }

    return res.res422({ msg });
  } else if (result.success) {
    __cg("success form");
  }
};
