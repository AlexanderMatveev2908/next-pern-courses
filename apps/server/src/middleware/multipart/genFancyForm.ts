import { REG_INTEGER } from "@shared/first/constants/regex.js";
import { isJsObj, isStrBool } from "@shared/first/lib/dataStructure.js";
import { boolObj } from "@shared/first/lib/etc.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FastifyRequest } from "fastify";

const parseStr = (v: unknown) => {
  if (typeof v !== "string") return v;

  try {
    return REG_INTEGER.test(v as string)
      ? +(v as string)
      : isStrBool(v as string)
        ? boolObj[v as keyof typeof boolObj]
        : v;
  } catch (err: any) {
    __cg("err parsing for svc", err);
  }
};

const applyDeepParse = (v: unknown): unknown => {
  if (Array.isArray(v)) return v.map(applyDeepParse);

  if (isJsObj(v)) {
    const parsed: Record<string, unknown> = {};
    for (const key in v) {
      parsed[key] = applyDeepParse(v[key as keyof typeof v]);
    }
    return parsed;
  }

  return parseStr(v);
};
export const genFancyForm = async <T>(req: FastifyRequest, obj: T) => {
  const parsedForSvc: any = {};

  for (const k in obj) {
    const v = obj[k];

    parsedForSvc[k] = applyDeepParse(v);
  }

  req.myFancyForm = parsedForSvc;
};
