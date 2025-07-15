import { Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { objKeysConcept } from "@src/features/courses/lib/sqlData.js";
import { injectKeyValSQL } from "@src/lib/sql.js";
import sql from "sql-template-tag";

export const getInfoConceptSvc = async (id: string) => {
  const raw = sql`
 SELECT id,


    (        
        SELECT COALESCE(
            json_agg(
                json_build_object(
                    ${injectKeyValSQL(objKeysConcept.question, { prefix: "q" })},
                    'variants',(
                        SELECT COALESCE(
                            json_agg(
                                json_build_object(
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
  };
};
