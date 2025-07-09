import { FieldSearchClientType } from "@src/types/fastify.js";
import { FastifyRequest } from "fastify";
import { calcPagination, parseTxtSql } from "../lib/etc.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import db from "@src/conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";

export const getCoursesGenSQL = async (req: FastifyRequest) => {
  const { myQuery } = req;
  const { txtInputs } = myQuery as {
    txtInputs: FieldSearchClientType[];
  };
  const titleVal = (txtInputs ?? []).find((npt) => npt.name === "title")?.val;
  const parsed = parseTxtSql(titleVal);

  const { offset, limit } = calcPagination(req);

  const sqlCount = `
  SELECT COUNT (c."id") FROM "Course" AS c

  ${
    !isArrOK(parsed)
      ? 'WHERE (c."title" IS NOT NULL)'
      : "WHERE " +
        parsed!
          .map(
            (el, i, arg) =>
              `c."title" ILIKE '${el}'` + (i === arg.length - 1 ? "" : " OR"),
          )
          .join("\n")
  }
  `;

  const rawCount = await db.$queryRawUnsafe<{ count: number }[]>(sqlCount);
  const nHits = Number(rawCount?.[0]?.count ?? 0);
  const pages = Math.ceil(nHits / limit);

  const sql = `
    SELECT c."title", c."grade", c."techStack", c."tools",

  (
    SELECT json_agg(
      json_build_object(
        'url', ca."url",
        'publicID', ca."publicID"
      )
    )
    FROM "CloudAsset" AS ca
    WHERE ca."type" = 'IMAGE'
      AND ca."entityID" = c."id"
      AND ca."entityType" = 'COURSE'
  ) AS "images",

  (
    SELECT json_build_object(
      'url', ca."url",
      'publicID', ca."publicID"
    )
    FROM "CloudAsset" ca
    WHERE ca."entityID" = c."id"
      AND ca."type" = 'VIDEO'
    LIMIT 1
  ) AS "video"

FROM "Course" AS c
${
  !isArrOK(parsed)
    ? 'WHERE (c."title" IS NOT NULL)'
    : "WHERE " +
      parsed!
        .map(
          (el, i, arg) =>
            `c."title" ILIKE '${el}'` + (i === arg.length - 1 ? "" : " OR"),
        )
        .join("\n")
}


OFFSET ${offset}
LIMIT ${limit}
    `;

  return {
    sql,
    nHits,
    pages,
  };
};
