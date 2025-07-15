import { Concept, Question, Variant } from "@prisma/client";
import db from "@src/conf/db.js";
import { injectKeyValSQL, objKeysConcept } from "@src/lib/sql.js";
import sql from "sql-template-tag";

export type ReturnInfoCpt = Promise<{
  concept: Concept & {
    questions: (Question & { variants: Variant[] })[];
  };
}>;

export const getInfoConceptSvc = async (id: string): ReturnInfoCpt => {
  const raw = sql`
 SELECT cpt.id,


    (        
        SELECT COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    ${injectKeyValSQL(objKeysConcept.question, { prefix: "q" })},
                    'variants',(
                        SELECT COALESCE(
                            JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    ${injectKeyValSQL(objKeysConcept.variant, { prefix: "v" })}
                                )
                            )
                            ,
                            '[]'::JSON
                        )
                        FROM "Variant" v
                        WHERE v."questionID" = q.id
                    )
                )
            ),
            '[]'::JSON
        )
        FROM "Question" q
        WHERE q."conceptID" = ${id}
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
  } as unknown as ReturnInfoCpt;
};
