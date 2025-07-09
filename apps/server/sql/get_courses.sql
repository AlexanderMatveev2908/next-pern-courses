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
WHERE ($1::TEXT IS NULL OR c."title" ILIKE $1::TEXT)


OFFSET $2
LIMIT $3
