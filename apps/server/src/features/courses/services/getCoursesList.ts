import { FieldSearchClientType } from "@src/types/fastify.js";
import { FastifyRequest } from "fastify";
import {
  calcPagination,
  handlePagination,
  parseArrSQL,
  parseTxtSql,
} from "../lib/etc.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import db from "@src/conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";
import sql, { Sql } from "sql-template-tag";

export const handleRawSQL = async (req: FastifyRequest) => {
  const { myQuery } = req;

  const {
    txtInputs,
    grade,
    stack,
    tech,
    createdAtSort,
    timeEstimatedSort,
    pointsGainedSort,
  } = myQuery as {
    txtInputs: FieldSearchClientType[];
  } & Record<string, any>;

  const titleVal = (txtInputs ?? []).find((npt) => npt.name === "title")?.val;
  const parsed = parseTxtSql(titleVal);

  const orCondSQL = (parsed ?? []).map(
    (word) => sql`c."title" ILIKE ${`%${word}%`}`,
  );
  const orGroupSQL = orCondSQL.length
    ? orCondSQL.reduce((acc, curr) => sql`${acc} OR ${curr}`)
    : sql`TRUE`;

  const andCondSQL: Sql[] = [];
  if (isArrOK(grade))
    andCondSQL.push(sql`c."grade" = ANY(${sql`${grade}::"Grade"[]`})`);

  if (isArrOK(stack))
    andCondSQL.push(sql`c."stack" = ANY(${sql`${stack}::"Stack"[]`})`);
  if (isArrOK(tech))
    andCondSQL.push(sql`c."tech" = ANY(${sql`${tech}::"Tech"[]`})`);
  const andGroupSQL = andCondSQL.length
    ? andCondSQL.reduce((acc, curr) => sql`${acc} AND ${curr}`)
    : sql`TRUE`;

  const whereSQL = sql`(${orGroupSQL}) AND ${andGroupSQL}`;

  const objSQL = {
    ASC: sql`ASC`,
    DESC: sql`DESC`,
  };

  const orderSQL: Sql[] = [];
  if (createdAtSort)
    orderSQL.push(
      sql`c."createdAt" ${objSQL[createdAtSort as keyof typeof objSQL]}`,
    );
  if (timeEstimatedSort)
    orderSQL.push(
      sql`c."estimatedTime" ${objSQL[timeEstimatedSort as keyof typeof objSQL]}`,
    );
  if (pointsGainedSort)
    orderSQL.push(
      sql`c."pointsGained" ${objSQL[pointsGainedSort as keyof typeof objSQL]}`,
    );

  const groupOrderSQL = orderSQL.length
    ? orderSQL.reduce((acc, curr) => sql`${acc}, ${curr}`)
    : sql`c."createdAt" ASC`;

  const { limit, offset, nHits, pages } = await handlePagination(req, whereSQL);

  // andCondSQL.push(sql`
  //     c."tags" @> ARRAY['Async await', 'Variables']`);

  const querySQL = sql`
    SELECT
        c."title",
        c."grade",
        c."stack",
        c."tech",

    (
    SELECT json_agg(
        json_build_object(
            'url', ca."url",
            'publicID', ca."publicID"
        )
    )
    FROM "CloudAsset" ca
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
    ) AS "video"

    FROM "Course" AS c

    WHERE ${whereSQL}

    ORDER BY ${groupOrderSQL}

    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const courses = await db.$queryRawUnsafe(querySQL.text, ...querySQL.values);

  return {
    courses,
    nHits,
    pages,
  };
};
