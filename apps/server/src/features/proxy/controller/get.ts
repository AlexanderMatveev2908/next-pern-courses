import { __cg } from "@shared/first/lib/logger.js";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { grabJsonDummyAssets } from "../lib/index.js";
import { chain_path } from "@src/lib/system/index.js";
import fs from "fs";
import archiver from "archiver";
import mime from "mime-types";
import { v4 } from "uuid";
import path from "path";

export const grabImages = async (req: FastifyRequest, res: FastifyReply) => {
  const { picked } = await grabJsonDummyAssets();

  const b64Arg: string[] = [];

  let i = 0;
  do {
    const curr = picked[i];
    const resBuff = await axios.get((curr as any).download_url, {
      responseType: "arraybuffer",
    });
    const { data: buff } = resBuff;

    const contentType = resBuff.headers["content-type"];
    const base64 = buff.toString("base64");
    b64Arg.push(`data:${contentType};base64,${base64}`);

    i++;
  } while (i < picked.length);

  return res.res200({
    b64Arg,
  });
};

export const grabAssetsBlob = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const p = chain_path("assets/videos/eg.mp4");
  const buff = await fs.promises.readFile(p);

  res.header("Content-Type", "video/mp4");
  res.header("Content-Length", buff.length);
  res.status(200);

  return res.send(buff);
};

export const grabMarkdown = async (req: FastifyRequest, res: FastifyReply) => {
  const md = await fs.promises.readFile(chain_path("assets/markdown/eg.md"));
  const str = md.toString("utf-8");

  return res.res200({
    markdown: str,
  });
};

export const getZipData = async (req: FastifyRequest, res: FastifyReply) => {
  res.raw.setHeader("Content-Type", "application/zip");
  res.raw.setHeader(
    "Content-Disposition",
    "attachment; filename=pre_fill_bundle.zip",
  );

  const arch = archiver("zip", { zlib: { level: 9 } });

  arch.on("error", (err) => {
    __cg("zip err", err);

    return res.err500({ msg: err?.message });
  });

  arch.pipe(res.raw);

  const { picked } = await grabJsonDummyAssets();

  let i = 0;
  do {
    const curr = picked[i];

    const response = await axios.get((curr as any).download_url);

    const contentType = response.headers["content-type"];
    const ext = mime.extension(contentType);

    arch.append(response.data, { name: `img${i}.${ext}` });

    i++;
  } while (i < picked.length);

  const p = chain_path("assets/videos/eg.mp4");
  const buff = await fs.promises.readFile(p);
  const ext = path.extname(p);

  arch.append(buff, { name: "eg" + ext });

  const md = await fs.promises.readFile(chain_path("assets/markdown/eg.md"));
  const str = md.toString("utf-8");

  arch.append(str, { name: "eg.md" });

  await arch.finalize();
};
