import { CloudAsset } from "@prisma/client";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { AppFile } from "@src/types/fastify.js";
import { uploadRam } from "./cloud/ram.js";
import { uploadDisk } from "./cloud/disk.js";
import { __cg } from "@shared/first/lib/logger.js";
import { clearAssets, clearLocalAssets } from "./etc.js";

export type ReturnFromCLoud = Promise<{
  imagesUploaded: CloudAsset[];
  videoUploaded: CloudAsset | null;
}>;

export const handleUploadAssets = async ({
  folder,
  imageFiles,
  videoFile,
}: {
  imageFiles: AppFile[];
  videoFile?: AppFile;
  folder: string;
}): ReturnFromCLoud => {
  let imagesUploaded: Partial<CloudAsset>[] = [];
  let videoUploaded: Partial<CloudAsset> | null = null;

  try {
    if (isArrOK(imageFiles))
      imagesUploaded = await Promise.all(
        imageFiles.map(
          async (f) => await uploadRam(f, { folder: `${folder}_images` }),
        ),
      );
    if (isObjOK(videoFile))
      videoUploaded = await uploadDisk(videoFile as AppFile, {
        folder: `${folder}_videos`,
        resource: "video",
      });
  } catch (err: any) {
    __cg("upload error", err);

    await clearLocalAssets(videoFile);
    await clearAssets(imagesUploaded, videoUploaded);

    throw err;
  }

  return {
    imagesUploaded,
    videoUploaded,
  } as unknown as ReturnFromCLoud;
};

export const wrapServiceCleanCloud = async <T>(
  {
    imagesUploaded,
    videoUploaded,
    videoFile,
  }: {
    imagesUploaded: Partial<CloudAsset>[];
    videoUploaded?: Partial<CloudAsset> | null;
    videoFile?: AppFile | null;
  },
  cb: () => Promise<T>,
) => {
  try {
    return await cb();
  } catch (err: any) {
    __cg("err transaction");

    await clearLocalAssets(videoFile);
    await clearAssets(imagesUploaded, videoUploaded);

    throw err;
  }
};
