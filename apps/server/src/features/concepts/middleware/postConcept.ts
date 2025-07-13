import { __cg } from "@shared/first/lib/logger.js";
import { clearLocalAssets, grabFilesByMime } from "@src/lib/etc.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { ServerConceptFormType } from "../paperwork/postConept.js";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { writeJsObj } from "@src/lib/system/index.js";
import { REG_INTEGER } from "@shared/first/constants/regex.js";

const parseJson = (v: unknown) => {
  try {
    if (
      isStr(v as string) &&
      (v as string).startsWith("{") &&
      (v as string).endsWith("}")
    )
      return JSON.parse(v as string);

    return v;
  } catch (err: any) {
    __cg("err parse form data", err);

    return v;
  }
};
const parseVal = (v: unknown) => {
  if (Array.isArray(v)) return v.map((el) => parseJson(el));
  else return parseJson(v);
};

export const postConceptMdw: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData: { fields, files } = {} } = req;

  if (!files || !fields) return res.res422({ msg: "form data miss at all" });

  const { imageFiles, videoFile } = grabFilesByMime(files!);

  const fancyForm: any = {};

  try {
    for (const k in fields) {
      const v = fields[k];
      const parsed = parseVal(v);

      if (fancyForm[v]) {
        const existing = fancyForm[k];

        fancyForm[k] = Array.isArray(existing)
          ? existing.concat(parsed)
          : [...existing, parsed];
      } else {
        fancyForm[k] = parsed;
      }
    }

    // for (const k in fancyForm) {
    //   if (k === "quiz") {
    //     const arg = fancyForm[k];
    //     for (const el of arg) {
    //       for (const variant of el.variants) {
    //         __cg("el", variant);
    //       }
    //     }
    //   }
    // }

    throw new Error("delete stuff");
  } catch (err: any) {
    __cg("err parse multipart", err?.message);

    await clearLocalAssets(videoFile);

    throw err;
  }
};
