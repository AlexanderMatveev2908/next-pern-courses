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

const applyDeepParse = (arg: unknown): unknown => {
  if (
    arg instanceof Buffer ||
    (isJsObj(arg) && "buffer" in arg && arg.buffer instanceof Buffer)
  )
    return arg;

  if (Array.isArray(arg)) return arg.map(applyDeepParse);

  if (isJsObj(arg)) {
    const parsed: Record<string, unknown> = {};
    for (const k in arg) {
      parsed[k] = applyDeepParse(arg[k as keyof typeof arg]);
    }
    return parsed;
  }

  return parseStr(arg);
};
export const genFancyForm = async <T>(req: FastifyRequest, obj: T) => {
  try {
    const parsedForSvc: any = {};

    for (const k in obj) {
      const v = obj[k];

      parsedForSvc[k] = applyDeepParse(v);
    }

    req.myFancyForm = parsedForSvc;
  } catch (err: any) {
    __cg("err recursive parse", err);
  }
};
