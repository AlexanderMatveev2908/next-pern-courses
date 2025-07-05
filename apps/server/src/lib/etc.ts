import { CloudAsset } from "@prisma/client";
import { isArrOK, isObjOK, isStr } from "@shared/first/lib/dataStructure.js";
import { delCloud } from "./cloud/delete.js";
import { __cg } from "@shared/first/lib/logger.js";
import fs from "fs";
import { AppFile } from "@src/types/fastify.js";

export const clearAssets = async (
  images: Partial<CloudAsset>[],
  video: Partial<CloudAsset> | null,
): Promise<void> => {
  if (isArrOK(images))
    await delCloud(
      images.map((i) => i.publicID).filter((id): id is string => isStr(id)),
      "image",
    );

  if (isObjOK(video)) await delCloud([video!.publicID!], "video");
};

export const clearLocalAssets = async (videoFile?: AppFile) => {
  if (isStr(videoFile?.path))
    try {
      await fs.promises.unlink(videoFile!.path!);

      __cg("success local delete");
    } catch (err) {
      __cg("fail local delete");
    }
};
