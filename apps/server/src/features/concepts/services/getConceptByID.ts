import { Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { injectKeyValSQL, objKeysConcept } from "@src/lib/sql.js";
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

        (
           SELECT row_to_json(cpt_user_outer)
           FROM (
            SELECT cpt_user_inner.id, cpt_user_inner.score,

            (
                SELECT json_agg(row_to_json(answers))
                
                FROM (
                    SELECT user_asw.id, user_asw."isCorrect", user_asw."variantID", user_asw."questionID",

                    (   
                        SELECT CASE 
                        WHEN user_asw."isCorrect" THEN NULL
                        ELSE (
                            SELECT json_build_object(
                                'id',right_choice.id,
                                'answer',right_choice.answer
                            )
                            FROM "Variant" right_choice
                            WHERE right_choice."questionID" = user_asw."questionID"
                            AND right_choice."isCorrect" = true
                            LIMIT 1
                        )
                        END
                    ) "correctAnswer",

                    (
                        SELECT row_to_json(variant_joined_processed)
                        FROM (
                            SELECT variant_joined.id, variant_joined.answer, variant_joined."isCorrect", variant_joined."questionID"

                            FROM "Variant" variant_joined
                            WHERE variant_joined.id = user_asw."variantID"  
                        ) variant_joined_processed
                    ) variant

                    FROM "UserAnswer" user_asw 
                    WHERE user_asw."userConceptID" = cpt_user_inner.id
                ) answers
            ) "userAnswers"

            FROM "UserConcept" cpt_user_inner 
            WHERE  cpt_user_inner."conceptID" = cpt.id
            LIMIT 1
           ) cpt_user_outer
        ) "userConcept",

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
