import { CloudAsset } from "@prisma/client";
import { cloud } from "src/conf/cloud.js";
import { AppFile } from "src/types/fastify.js";

export const uploadRam = async (
  file: AppFile,
  {
    folder,
  }: {
    folder: string;
  },
): Promise<Partial<CloudAsset>> => {
  if (!file || !(file.buffer instanceof Buffer))
    throw new Error("File not found");

  const b64 = file.buffer.toString("base64");
  const data = `data:${file.mimetype};base64,${b64}`;

  const res = await cloud.uploader.upload(data, {
    resource_type: "image",
    folder: `next_pern_courses__${folder}`,
  });

  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
