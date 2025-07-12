import { __cg } from "@shared/first/lib/logger.js";
import { clearLocalAssets, grabFilesByMime } from "@src/lib/etc.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";

export const postConceptMdw: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData: { fields, files } = {} } = req;

  if (!files || !fields) return res.res422({ msg: "form data miss at all" });

  const { imageFiles, videoFile } = grabFilesByMime(files!);

  try {
  } catch (err: any) {
    __cg("err parse multipart", err?.message);

    await clearLocalAssets();
  }

  __cg("data");
};
