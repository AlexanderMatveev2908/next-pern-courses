import { FieldSearchClientType } from "@src/types/fastify.js";
import { FastifyRequest } from "fastify";
import { calcPagination, parseTxtSql } from "../lib/etc.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import db from "@src/conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";

export const handleRawSQL = async (req: FastifyRequest) => {
  const { myQuery } = req;

  const { offset, limit } = calcPagination(req);

  const { txtInputs } = myQuery as {
    txtInputs: FieldSearchClientType[];
  };
  const titleVal = (txtInputs ?? []).find((npt) => npt.name === "title")?.val;
  const parsedSQL = parseTxtSql(titleVal);

  const condSQL: string[] = [];
  const valsSQL: string[] = [];

  let i = 0;
  while (i < (parsedSQL?.length ?? 1)) {
    if (!isArrOK(parsedSQL)) {
      condSQL.push(`c."title" IS NOT NULL`);
      break;
    } else {
      condSQL.push(`c."title" ILIKE $${i + 1}`);
      valsSQL.push(parsedSQL![i]);

      i++;
    }
  }

  const sqlCount = `
  SELECT COUNT (c."id") FROM "Course" AS c
  WHERE ${condSQL.join(" OR ")}
  `;

  const rawCount = await db.$queryRawUnsafe<{ count: number }[]>(
    sqlCount,
    ...valsSQL,
  );
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
WHERE ${condSQL.join(" OR ")}


OFFSET ${offset}
LIMIT ${limit}
    `;

  const courses = await db.$queryRawUnsafe(sql, ...valsSQL);
  return {
    courses,
    nHits,
    pages,
  };
};
