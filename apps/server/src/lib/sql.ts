import { isStr } from "@shared/first/lib/dataStructure.js";
import { FastifyRequest } from "fastify";
import sql from "sql-template-tag";

export const injectKeyValSQL = (
  keys: string[],
  { prefix }: { prefix: "c" | "cpt" | "q" | "v" },
) => sql([keys.map((k) => `'${k}', ${prefix}."${k}"`).join(",\n")]);

export const objKeysConcept = {
  concept: [
    "id",
    "title",
    "description",
    "markdown",
    "estimatedTime",
    "pointsGained",
    "order",
    "isCompleted",
  ],
  question: ["id", "title", "question"],
  variant: ["id", "answer", "isCorrect"],
};

export const parseTxtSql = (str?: string): string[] | null => {
  if (!isStr(str)) return null;

  const parsed = str!
    .split(" ")
    .filter(Boolean)
    .map((el) => `%${el}%`);

  return parsed;
};

export const parseArrSQL = (arg: string[], name: string) =>
  `ARRAY[${arg.map((val: string) => `'${val}'`).join(", ")}]::"${name}"[]`;

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
