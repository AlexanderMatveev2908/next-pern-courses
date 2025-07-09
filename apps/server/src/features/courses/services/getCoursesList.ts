import { FieldSearchClientType } from "@src/types/fastify.js";
import { FastifyRequest } from "fastify";
import { calcPagination, parseArrSQL, parseTxtSql } from "../lib/etc.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import db from "@src/conf/db.js";
import { __cg } from "@shared/first/lib/logger.js";
import sql, { Sql } from "sql-template-tag";

export const handleRawSQL = async (req: FastifyRequest) => {
  const { myQuery } = req;
  const { offset, limit } = calcPagination(req);

  const { txtInputs, grade, techStack, tools, createdAtSort } = myQuery as {
    txtInputs: FieldSearchClientType[];
  } & Record<string, any>;

  const titleVal = (txtInputs ?? []).find((npt) => npt.name === "title")?.val;
  const parsed = parseTxtSql(titleVal);

  const orCondSQL = isArrOK(parsed)
    ? parsed!.map(
        (word) => sql`c."title" ILIKE ${`%${word}%`} OR 
    EXISTS(
      SELECT 1 FROM unnest(c."tags") AS t 
      WHERE t ILIKE ${`%${word}%`}
    )`,
      )
    : [sql`TRUE`];

  const andCondSQL: Sql[] = [];

  // ? here work grade as string because i forgot to cast it as enum
  if (isArrOK(grade)) andCondSQL.push(sql`c."grade" = ANY(${grade})`);
  if (isArrOK(techStack))
    andCondSQL.push(
      sql([`c."techStack" = ANY(${parseArrSQL(techStack, "TechStack")})`]),
    );
  if (isArrOK(tools))
    andCondSQL.push(sql([`c."tools" = ANY(${parseArrSQL(tools, "Tools")})`]));

  // andCondSQL.push(sql`
  //     c."tags" @> ARRAY['Async await', 'Variables']`);

  const orGroup = orCondSQL.length
    ? orCondSQL.reduce((acc, curr) => sql`${acc} OR ${curr}`)
    : sql`TRUE`;
  const andGroup = andCondSQL.length
    ? andCondSQL.reduce((acc, curr) => sql`${acc} AND ${curr}`)
    : sql`TRUE`;

  const order: Sql[] = [];

  if (createdAtSort === "ASC" || createdAtSort === "DESC") {
    order.push(sql([`c."createdAt" ${createdAtSort}`]));
  }

  const orderSQL = order.length
    ? order.reduce((acc, curr) => sql`${acc}, ${curr}`)
    : sql`c."createdAt" DESC`;

  __cg("orderSQL", orderSQL.text);

  const whereSQL = sql`(${orGroup}) AND (${andGroup})`;

  const countSQL = sql`
    SELECT COUNT(c."id") FROM "Course" AS c
    WHERE ${whereSQL}
  `;

  const rawCount = await db.$queryRawUnsafe<{ count: bigint }[]>(
    countSQL.text,
    ...countSQL.values,
  );
  const nHits = Number(rawCount?.[0]?.count ?? 0);
  const pages = Math.ceil(nHits / limit);

  const querySQL = sql`
    SELECT
        c."title",
        c."grade",
        c."techStack",
        c."tools",

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

    ORDER BY ${orderSQL}

    OFFSET ${offset}
    LIMIT ${limit}
  `;

  const courses = await db.$queryRawUnsafe(querySQL.text, ...querySQL.values);

  return {
    courses,
    nHits,
    pages,
  };
};
