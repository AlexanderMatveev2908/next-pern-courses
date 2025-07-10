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

  const whereSQL = sql`(${orGroupSQL})`;

  const { limit, offset, nHits, pages } = await handlePagination(req, whereSQL);
  // const andCondSQL: Sql[] = [];

  // ? here work grade as string because i forgot to cast it as enum
  // if (isArrOK(grade)) andCondSQL.push(sql`c."grade" = ANY(${grade})`);
  // if (isArrOK(techStack))
  //   andCondSQL.push(
  //     sql([`c."techStack" = ANY(${parseArrSQL(techStack, "TechStack")})`]),
  //   );
  // if (isArrOK(tools))
  //   andCondSQL.push(sql([`c."tools" = ANY(${parseArrSQL(tools, "Tools")})`]));

  // andCondSQL.push(sql`
  //     c."tags" @> ARRAY['Async await', 'Variables']`);

  // const andGroup = andCondSQL.length
  //   ? andCondSQL.reduce((acc, curr) => sql`${acc} AND ${curr}`)
  //   : sql`TRUE`;

  // const order: Sql[] = [];

  // if (createdAtSort) {
  //   order.push(sql([`c."createdAt" ${createdAtSort}`]));
  // }

  // const orderSQL = order.length
  //   ? order.reduce((acc, curr) => sql`${acc}, ${curr}`)
  //   : sql`c."createdAt" DESC`;

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
