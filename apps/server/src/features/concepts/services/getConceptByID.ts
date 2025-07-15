import { Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { injectKeyValSQL, objKeysConcept } from "@src/lib/sql.js";
import { grabAssetsItem } from "@src/services/grabAssetsItem.js";
import sql from "sql-template-tag";

export const getConceptByIDSvc = async (id: string) => {
  const raw = sql`
        WITH cpt_list AS (
        SELECT id, title, "courseID", "order", "isCompleted"
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
           SELECT ROW_TO_JSON(cpt_user_outer)
           FROM (
            SELECT cpt_user_inner.id, cpt_user_inner.score,
            (
                SELECT JSON_AGG(ROW_TO_JSON(answers))
                
                FROM (
                    SELECT user_asw.id, user_asw."isCorrect", user_asw."variantID", user_asw."questionID",

                    (   
                        SELECT CASE 
                        WHEN user_asw."isCorrect" THEN NULL
                        ELSE (
                            SELECT JSON_BUILD_OBJECT(
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
                        SELECT ROW_TO_JSON(variant_joined_processed)
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

        JSON_BUILD_OBJECT(
        'conceptsCount', (
            SELECT COUNT(*) FROM cpt_list
            ),
        'prev', (
            SELECT ROW_TO_JSON(ref)
            FROM cpt_list ref
            WHERE ref."order" = cpt."order" - 1
            ),
        'next', (
            SELECT ROW_TO_JSON(ref)
            FROM cpt_list ref
            WHERE ref."order" = cpt."order" + 1
            )
        ) refs,

        ${grabAssetsItem("CONCEPT", { prefix: "cpt" })},

        (
            SELECT COALESCE( 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        ${injectKeyValSQL([...objKeysConcept.question, "createdAt"], { prefix: "q" })},
                        'variants',(
                            SELECT COALESCE (
                                JSON_AGG(
                                    JSON_BUILD_OBJECT(
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
