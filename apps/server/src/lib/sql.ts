import sql from "sql-template-tag";

export const injectKeyValSQL = (
  keys: string[],
  { prefix }: { prefix: "c" | "cpt" | "q" | "v" },
) => sql([keys.map((k) => `'${k}', ${prefix}."${k}"`).join(",\n")]);
