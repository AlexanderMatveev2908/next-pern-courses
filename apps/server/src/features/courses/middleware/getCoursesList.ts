import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { schemaSearchCoursesServer } from "../paperwork/getCoursesList.js";
import { grabErrMsgZOD } from "@shared/first/lib/etc.js";

export const checkSearchCoursesList: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myQuery } = req;

  if (!myQuery) return res.res422({ msg: "missing query at all" });

  const result = schemaSearchCoursesServer.safeParse(myQuery);

  if (!result.success) {
    const { fancyErrsList, msg } = grabErrMsgZOD(result);

    return res.res422({
      msg,
      fancyErrsList,
    });
  }
};
