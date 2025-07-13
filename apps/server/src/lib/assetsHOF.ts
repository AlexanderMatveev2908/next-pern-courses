import { CloudAsset } from "@prisma/client";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { AppFile } from "@src/types/fastify.js";
import { uploadRam } from "./cloud/ram.js";
import { uploadDisk } from "./cloud/disk.js";
import { __cg } from "@shared/first/lib/logger.js";
import { clearAssets, clearLocalAssets } from "./etc.js";

export const handleUploadAssets = async (
  imageFiles: AppFile[],
  videoFile?: AppFile,
) => {
  let images: Partial<CloudAsset>[] = [];
  let video: Partial<CloudAsset> | null = null;

  try {
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
  } catch (err: any) {
    __cg("upload error", err);

    await clearLocalAssets(videoFile);
    await clearAssets(images, video);

    throw err;
  }

  return {
    images,
    video,
  };
};
