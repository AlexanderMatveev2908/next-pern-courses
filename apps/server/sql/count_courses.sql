SELECT COUNT(c."id")


FROM "Course" AS c
WHERE ($1::TEXT IS NULL OR c."title" ILIKE $1::TEXT)



