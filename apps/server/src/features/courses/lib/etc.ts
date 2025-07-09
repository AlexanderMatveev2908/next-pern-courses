import { isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FastifyRequest } from "fastify";

export const calcPagination = (req: FastifyRequest) => {
  const {
    myQuery: { limit, page },
  } = req as Record<string, any>;
  const offset = page * limit;

  return {
    offset,
    limit,
  };
};

export const parseTxtSql = (str?: string): string[] | null => {
  if (!isStr(str)) return null;

  const parsed = str!
    .split(" ")
    .filter(Boolean)
    .map((el) => `%${el}%`);

  __cg("parsed", parsed);

  return parsed;
};
