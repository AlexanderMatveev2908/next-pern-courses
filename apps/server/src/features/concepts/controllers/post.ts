import { __cg } from "@shared/first/lib/logger.js";
import { handleUploadAssets } from "@src/lib/assetsHOF.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { postConceptSvc } from "../services/postConcept.js";
import { Concept } from "@prisma/client";
import { ServerConceptFormType } from "../paperwork/postConept.js";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFancyForm } = req;
  const { imageFiles, videoFile } = myFancyForm ?? {};
  const { params: { courseID } = {} } = req as {
    params: {
      courseID: string;
    };
  };

  const { imagesUploaded, videoUploaded } = await handleUploadAssets({
    imageFiles,
    videoFile,
    folder: "course",
  });

  const concept = await postConceptSvc({
    data: myFancyForm as ServerConceptFormType,
    imagesUploaded,
    videoUploaded,
    videoFile,
    courseID: courseID!,
  });

  return res.res201({
    msg: "Concept added",
    concept,
  });
};
