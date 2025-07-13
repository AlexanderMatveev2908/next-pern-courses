import { __cg } from "@shared/first/lib/logger.js";
import { uploadDisk } from "@src/lib/cloud/disk.js";
import { chain_path } from "@src/lib/system/index.js";
import { AppFile } from "@src/types/fastify.js";
import fs from "fs";
import mime from "mime-types";
import { v4 } from "uuid";
import path from "path";
import db from "@src/conf/db.js";
import { EntityType } from "@prisma/client";

export const getAssetsByFolder = async (folderName: string) => {
  const techDir = chain_path(`assets/images/${folderName}`);

  const listImages = await fs.promises.readdir(techDir);
  const processed = listImages.map((img) =>
    chain_path(`assets/images/${folderName}/${img}`),
  );

  for (const p of processed) {
    const stat = await fs.promises.stat(p);

    if (!stat.isFile()) {
      throw new Error(`${p} is not a file 😡`);
    }
  }

  return {
    paths: processed,
  };
};

export const readMarkdown = async (p: string) => {
  const fullP = chain_path(p);
  const exist = fs.existsSync(fullP);
  const stat = await fs.promises.stat(fullP);

  if (!exist || !stat.isFile()) throw new Error(`${fullP} is not a file 😡`);

  const markdown = await fs.promises.readFile(chain_path(p), "utf-8");

  return markdown + "";
};

export const getInfoAsset = async (p: string) => {
  const fileBuff: Buffer = await fs.promises.readFile(p);

  const mimetype = mime.lookup(p);
  if (!mimetype) throw new Error("I do not know what we are uploading 😵‍💫");
  const ext = path.extname(p);

  return {
    filename: v4() + ext,
    mimetype,
    buffer: null,
    size: fileBuff.length,
  };
};

export const uploadCloudMyImages = async (p: string) => {
  const { buffer, filename, mimetype, size } = await getInfoAsset(p);

  const fancyFile: AppFile = {
    fieldname: "image",
    filename,
    mimetype,
    buffer,
    size,
    path: p,
  };

  const uploaded = await uploadDisk(fancyFile, {
    folder: "course_images",
    resource: "image",
  });

  return uploaded;
};

export const uploadCloudMyVideo = async (p: string) => {
  const { buffer, filename, mimetype, size } = await getInfoAsset(p);

  const fancyFile: AppFile = {
    fieldname: "video",
    filename,
    mimetype,
    buffer,
    size,
    path: p,
  };

  const uploaded = await uploadDisk(fancyFile, {
    folder: "course_videos",
    resource: "video",
  });

  return uploaded;
};

export const addCloudAssetsModel = async ({
  entityID,
  nameFolder,
  entityType,
  maxImages = 5,
}: {
  entityID: string;
  nameFolder: string;
  entityType: EntityType;
  maxImages?: number;
}) => {
  const { paths } = await getAssetsByFolder(nameFolder);
  const uploadedImgs = await Promise.all(
    paths.slice(0, maxImages).map(async (p) => await uploadCloudMyImages(p)),
  );
  await db.cloudAsset.createMany({
    data: uploadedImgs.map((img) => ({
      entityID: entityID,
      entityType,
      type: "IMAGE",
      url: img.url!,
      publicID: img.publicID!,
    })),
  });

  const vidPath = chain_path("assets/videos/eg.mp4");
  const vidUploaded = await uploadCloudMyVideo(vidPath);
  await db.cloudAsset.create({
    data: {
      entityID: entityID,
      entityType,
      type: "VIDEO",
      url: vidUploaded.url!,
      publicID: vidUploaded.publicID!,
    },
  });
};
