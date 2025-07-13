import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { CourseFormServerType } from "../paperwork/postCourse.js";
import { postCourseService } from "../services/postCourse.js";
import { AppFile } from "@src/types/fastify.js";
import {
  clearAssets,
  clearLocalAssets,
  grabFilesByMime,
} from "@src/lib/etc.js";
import { handleUploadAssets } from "@src/lib/assetsHOF.js";

export type ServerSideFormCourse = Omit<
  Partial<CourseFormServerType>,
  "images" | "video" | "imageFiles" | "videoFile" | "tags"
> & { tags?: string[] };

export const postCourse = async (req: FastifyRequest, res: FastifyReply) => {
  const {
    myFormData,
  }: {
    myFormData?: {
      fields: ServerSideFormCourse;
      files: AppFile[];
    };
  } = req;

  const { files, fields } = myFormData ?? {};
  const { imageFiles, videoFile } = grabFilesByMime(files!);
  const { imagesUploaded, videoUploaded } = await handleUploadAssets({
    imageFiles,
    videoFile,
    folder: "concept",
  });

  const course = await postCourseService({
    fields: fields!,
    imagesUploaded,
    videoUploaded,
    videoFile,
  });

  await clearLocalAssets(videoFile);

  return res.res200({
    msg: "new course created",
    course,
  });
};
