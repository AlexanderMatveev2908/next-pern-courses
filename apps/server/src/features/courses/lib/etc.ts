import { isStr } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import db from "@src/conf/db.js";
import { calcPagination } from "@src/lib/sql.js";
import { FastifyRequest } from "fastify";
import sql, { Sql } from "sql-template-tag";

export const handlePagination = async (req: FastifyRequest, whereSQL: Sql) => {
  const { limit, offset } = calcPagination(req);

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

  return {
    limit,
    offset,
    nHits,
    pages,
  };
};
