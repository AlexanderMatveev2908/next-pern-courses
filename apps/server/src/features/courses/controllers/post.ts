import { CloudAsset } from "@prisma/client";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest } from "fastify";
import db from "@src/conf/db.js";
import { uploadDisk } from "@src/lib/cloud/disk.js";
import { uploadRam } from "@src/lib/cloud/ram.js";
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
  const { images, video } = await handleUploadAssets(imageFiles, videoFile);

  const course = await postCourseService({
    fields: fields!,
    images,
    video,
    videoFile,
  });

  await clearLocalAssets(videoFile);

  return res.res200({
    msg: "new course created",
    course,
  });
};
