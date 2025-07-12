import { __cg } from "@shared/first/lib/logger.js";
import { genRandomByMinMax, pickRandom } from "@src/dev_only/mock/utils.js";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

export const grabImages = async (req: FastifyRequest, res: FastifyReply) => {
  const { data: jsonData } = await axios.get(`https://picsum.photos/v2/list`, {
    params: {
      page: genRandomByMinMax(0, 5),
      limit: 50,
    },
  });

  const picked = Array.from(
    {
      length: 5,
    },
    () => pickRandom(jsonData),
  );

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
