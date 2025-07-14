import { Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { objKeysConcept } from "@src/features/courses/lib/sqlData.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const getConceptByIDSvc = async (id: string) => {
  const raw = sql`
        SELECT cpt.*,

        (
            json_build_object(
                'conceptsCount', (
                    SELECT COUNT(*)::INT 
                    FROM "Concept" others
                    WHERE others."courseID" = cpt."courseID"
                ),
                'prev',(
                    SELECT row_to_json(ref_data)
                    FROM (
                        SELECT ref.id, ref.title, ref."courseID"
                        FROM "Concept" ref
                        WHERE ref.order = cpt.order - 1
                        AND ref."courseID" = cpt."courseID"
                    ) ref_data
                ),
                'next',(
                    SELECT row_to_json(ref_data)
                    FROM (
                        SELECT ref.id, ref.title, ref."courseID"
                        FROM "Concept" ref
                        WHERE ref.order = cpt.order + 1
                        AND ref."courseID" = cpt."courseID"
                    ) ref_data
                )
            )
        ) refs,

        ${grabAssetsItem("CONCEPT", { prefix: "cpt" })},

        (
            SELECT COALESCE( 
                json_agg(
                    json_build_object(
                        ${injectKeyValSQL(objKeysConcept.quiz, { prefix: "q" })},
                        'variants',(
                            SELECT COALESCE (
                                json_agg(
                                    json_build_object(
                                        ${injectKeyValSQL(objKeysConcept.variant, { prefix: "v" })}
                                    )
                                )
                                , '[]'::JSON
                            )
                            FROM "Variant" v
                            WHERE v."quizID" = q.id
                        )
                    )
                ), '[]'::JSON
            )
            FROM "Quiz" q
            WHERE q."conceptID" = cpt.id
        ) quizzes

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
