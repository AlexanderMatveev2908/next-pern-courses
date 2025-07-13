import { __cg } from "@shared/first/lib/logger.js";
import { handleUploadAssets } from "@src/lib/assetsHOF.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFancyForm } = req;
  const { imageFiles, videoFile } = myFancyForm ?? {};

  const { images, video } = await handleUploadAssets(imageFiles, videoFile);

  __cg("uploaded", images, video);

  return res.res201({
    msg: "Concept added",
  });
};
