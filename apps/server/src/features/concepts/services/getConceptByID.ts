import db from "@src/conf/db.js";
import { objKeysConcept } from "@src/features/courses/lib/sqlData.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const getConceptByIDSvc = async (id: string) => {
  const raw = sql`
        SELECT cpt.*,

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

  const res = await db.$queryRawUnsafe(raw.text, ...raw.values);

  return {
    concept: res,
  };
};
