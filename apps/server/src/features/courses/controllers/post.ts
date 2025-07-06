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
import { clearAssets, clearLocalAssets } from "@src/lib/etc.js";

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

  const videoFile = (myFormData?.files ?? []).find(
    (f) => f.fieldname === "video",
  );

  let images: Partial<CloudAsset>[] = [];
  let video: Partial<CloudAsset> | null = null;

  try {
    if (isArrOK(myFormData?.files)) {
      const imageFiles = myFormData!.files.filter(
        (f) => f.fieldname === "images",
      );
      const videoFile = myFormData!.files.find((f) => f.fieldname === "video");

      if (isArrOK(imageFiles))
        images = await Promise.all(
          imageFiles.map(
            async (f) => await uploadRam(f, { folder: "course_images" }),
          ),
        );
      if (isObjOK(videoFile))
        video = await uploadDisk(videoFile as AppFile, {
          folder: "course_videos",
          resource: "video",
        });
    }
  } catch (err: any) {
    __cg("upload error", err);

    await clearLocalAssets(videoFile);
    await clearAssets(images, video);

    return res.res500({
      msg: "error uploading to cloud",
    });
  }

  const course = await postCourseService({
    fields: myFormData!.fields,
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
