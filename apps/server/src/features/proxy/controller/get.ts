import { __cg } from "@shared/first/lib/logger.js";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { grabJsonDummyAssets } from "../lib/index.js";
import { chain_path } from "@src/lib/system/index.js";
import fs from "fs";

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
