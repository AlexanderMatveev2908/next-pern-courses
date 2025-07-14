import sql from "sql-template-tag";

export const injectKeyValSQL = (
  keys: string[],
  { prefix }: { prefix: string },
) => sql([keys.map((k) => `'${k}', ${prefix}."${k}"`).join(",\n")]);
