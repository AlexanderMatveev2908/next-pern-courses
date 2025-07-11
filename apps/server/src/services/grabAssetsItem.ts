import sql from "sql-template-tag";
import { EntityType } from "@prisma/client";

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
