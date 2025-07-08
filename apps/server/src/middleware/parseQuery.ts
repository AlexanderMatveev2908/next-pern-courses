import { __cg } from "@shared/first/lib/logger.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";

const bool = {
  true: true,
  false: false,
};
const keysBool = Object.keys(bool);

const REG_NUM = /^-?\d+(\.\d+)?$/;

const handleHypotheticalJSON = (str: string) => {
  if (str.startsWith("{") && str.endsWith("}")) {
    try {
      return JSON.parse(str);
    } catch (err: any) {
      __cg("☢️, i ve been fooled", err);

      return str;
    }
  } else {
    return keysBool.includes(str)
      ? bool[str as keyof typeof bool]
      : REG_NUM.test(str)
        ? +str
        : str;
  }
};

export const parseQuery: preHandlerHookHandler = async (
  req: FastifyRequest,
  _: FastifyReply,
) => {
  const { query } = req;
  if (!query) return;

  const parsedQuery: Record<string, any> = {};

  for (const [k, v] of Object.entries(query)) {
    if (k.endsWith("[]")) {
      const key = k.replace("[]", "");
      const arr: unknown[] = [];

      if (Array.isArray(v)) {
        for (const item of v) {
          arr.push(handleHypotheticalJSON(item));
        }
      } else {
        arr.push(handleHypotheticalJSON(v as string));
      }

      parsedQuery[key] = arr;
    } else {
      parsedQuery[k] = handleHypotheticalJSON(v as string);
    }
  }

  req.myQuery = parsedQuery as any;
};
