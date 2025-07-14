import sql from "sql-template-tag";
import { EntityType } from "@prisma/client";

export const sqlStrImages = (
  entity: EntityType,
  { prefix }: { prefix: string },
) =>
  sql([
    `
    (
    SELECT json_agg(
          json_build_object(
            'url', ca."url",
            'publicID', ca."publicID"
          )
    )
    FROM "CloudAsset" ca
    WHERE ca."type" = 'IMAGE'
      AND ca."entityID" = ${prefix}."id"
      AND ca."entityType" = '${entity}'::"EntityType"
    )
`,
  ]);

export const grabAssetsItem = (entity: EntityType) => sql`
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
      AND ca."entityType" = ${sql`${entity}::"EntityType"`}
  ) AS "images",

  (
    SELECT json_build_object(
      'url', ca."url",
      'publicID', ca."publicID"
    )
    FROM "CloudAsset" AS ca
    WHERE ca."entityID" = c."id"
      AND ca."type" = 'VIDEO'
      AND ca."entityType" = ${sql`${entity}::"EntityType"`}
  ) AS "video"
`;
