import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { schemaSearchCoursesServer } from "../paperwork/getCoursesList.js";
import { grabErrMsgZOD } from "@shared/first/lib/etc.js";
import { checkZod } from "@src/middleware/validators/zodCheck.js";

export const checkSearchCoursesList: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myQuery } = req;

  if (!myQuery) return res.res422({ msg: "missing query at all" });

  const { isOK, fancyErrsList, msg } = await checkZod(myQuery, {
    schema: schemaSearchCoursesServer,
  });

  if (!isOK) return res.res422({ msg, fancyErrsList });
};
