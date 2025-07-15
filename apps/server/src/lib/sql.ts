import sql from "sql-template-tag";

export const injectKeyValSQL = (
  keys: string[],
  { prefix }: { prefix: "c" | "cpt" | "q" | "v" },
) => sql([keys.map((k) => `'${k}', ${prefix}."${k}"`).join(",\n")]);

export const objKeysConcept = {
  concept: [
    "id",
    "title",
    "description",
    "markdown",
    "estimatedTime",
    "pointsGained",
    "order",
  ],
  question: ["id", "title", "question"],
  variant: ["id", "answer", "isCorrect"],
};
