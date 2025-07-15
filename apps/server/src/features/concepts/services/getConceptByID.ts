import { Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { objKeysConcept } from "@src/features/courses/lib/sqlData.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const getConceptByIDSvc = async (id: string) => {
  const raw = sql`
        WITH cpt_list AS (
        SELECT id, title, "courseID", "order"
        FROM "Concept"
        WHERE "courseID" = (
            -- could just pass id as arg, i wanted just see how many sql patterns i could
            SELECT "courseID"
            FROM "Concept"
            WHERE id = ${id}
            )
        )

        SELECT cpt.*,

        json_build_object(
        'conceptsCount', (
            SELECT COUNT(*) FROM cpt_list
            ),
        'prev', (
            SELECT row_to_json(ref)
            FROM cpt_list ref
            WHERE ref."order" = cpt."order" - 1
            ),
        'next', (
            SELECT row_to_json(ref)
            FROM cpt_list ref
            WHERE ref."order" = cpt."order" + 1
            )
        ) refs,

        ${grabAssetsItem("CONCEPT", { prefix: "cpt" })},

        (
            SELECT COALESCE( 
                json_agg(
                    json_build_object(
                        ${injectKeyValSQL([...objKeysConcept.question, "createdAt"], { prefix: "q" })},
                        'variants',(
                            SELECT COALESCE (
                                json_agg(
                                    json_build_object(
                                        ${injectKeyValSQL([...objKeysConcept.variant, "questionID"], { prefix: "v" })}
                                    )
                                )
                                , '[]'::JSON
                            )
                            FROM "Variant" v
                            WHERE v."questionID" = q.id
                        )
                    )
                    ORDER BY q."createdAt" ASC
                ), '[]'::JSON
            )
            FROM "Question" q
            WHERE q."conceptID" = cpt.id
        ) questions

        FROM "Concept" cpt

        WHERE cpt.id = ${id}
    `;

  const [concept] = await db.$queryRawUnsafe<Concept[]>(
    raw.text,
    ...raw.values,
  );

  return {
    concept,
  };
};
