import { CloudAsset } from "@prisma/client";
import { isArrOK, isObjOK, isStr } from "@shared/first/lib/dataStructure.js";
import { delCloud } from "src/lib/cloud/delete.js";

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
