import { CloudAsset } from "@prisma/client";
import { cloud } from "@src/conf/cloud.js";
import { AppFile } from "@src/types/fastify.js";

export const uploadDisk = async (
  file: AppFile,
  { folder, resource }: { folder: string; resource: "image" | "video" },
): Promise<Partial<CloudAsset>> => {
  if (!file || !("path" in file)) throw new Error("File not found");

  const res = await cloud.uploader.upload(file!.path!, {
    resource_type: resource,
    folder: `next_pern_courses__${folder}`,
  });

  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
