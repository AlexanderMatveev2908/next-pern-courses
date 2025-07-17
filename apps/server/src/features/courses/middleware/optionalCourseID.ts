import { REG_ID } from "@shared/first/constants/regex.js";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { GenericReq } from "@src/types/fastify.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const checkOptionalCourseID = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { params: { courseID } = {} } = req as GenericReq;

  if (isStr(courseID) && !REG_ID.test(courseID))
    return res.err400({
      msg: "Invalid ID",
    });
};
