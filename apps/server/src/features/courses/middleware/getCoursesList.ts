import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { schemaSearchCoursesServer } from "../paperwork/getCoursesList.js";
import { checkZod } from "@src/middleware/validators/zodCheck.js";

export const checkSearchCoursesList: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myQuery } = req;

  if (!myQuery) return res.err422({ msg: "missing query at all" });

  const { isOK, fancyErrsList, msg } = await checkZod(myQuery, {
    schema: schemaSearchCoursesServer,
  });

  if (!isOK) return res.err422({ msg, fancyErrsList });
};
