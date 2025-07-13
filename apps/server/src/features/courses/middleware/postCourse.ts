import { FastifyReply, FastifyRequest } from "fastify";
import { schemaPostCourseServer } from "../paperwork/postCourse.js";
import { __cg } from "@shared/first/lib/logger.js";
import { boolObj } from "@shared/first/lib/etc.js";
import { grabFilesByMime } from "@src/lib/etc.js";
import { checkZod } from "@src/middleware/validators/zodCheck.js";

export const checkPostCourse = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData } = req;

  if (!myFormData) return res.res422({ msg: "missing form at all" });

  const { fields, files } = myFormData;
  const normalized = {
    ...fields,
    rootLanguage: boolObj[fields.rootLanguage as keyof typeof boolObj],
    ...grabFilesByMime(files),
  };

  const { isOK, fancyErrsList, msg } = await checkZod(normalized, {
    schema: schemaPostCourseServer,
  });

  if (!isOK) return res.res422({ msg, fancyErrsList });
};
