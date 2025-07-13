import { isArrOK, isObjOK, isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { grabFilesByMime } from "@src/lib/etc.js";
import { FastifyRequest } from "fastify";

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

export const normalizeForm = async (req: FastifyRequest) => {
  const { myFormData: { fields, files } = {} } = req;

  if (!isArrOK(files) || !isObjOK(fields)) throw new Error("Form miss at all");

  const { imageFiles, videoFile } = grabFilesByMime(files!);

  const fancyForm: any = {};

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

  const normalized = {
    ...fancyForm,
    imageFiles,
    videoFile,
  };

  return {
    normalized,
  };
};
