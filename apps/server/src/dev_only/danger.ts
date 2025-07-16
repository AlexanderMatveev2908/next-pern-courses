import { __cg } from "@shared/first/lib/logger.js";
import { cloud } from "@src/conf/cloud.js";
import db from "@src/conf/db.js";
import sql from "sql-template-tag";

const TABLES = [
  "CloudAsset",
  "UserAnswer",
  "UserConcept",
  "Variant",
  "Question",
  "Concept",
  "Course",
];

export const DEL_ALL = async () => {
  __cg("start deleting 🕰️");

  const raw = sql([
    `
  TRUNCATE TABLE ${TABLES.map((t) => `"${t}"`).join(",\n")}
  `,
  ]);

  await db.$queryRawUnsafe(raw.text, ...raw.values);

  // await cloud.api.delete_resources_by_prefix("next_pern_courses__", {
  //   resource_type: "image",
  // });

  // await cloud.api.delete_resources_by_prefix("next_pern_courses__", {
  //   resource_type: "video",
  // });

  __cg("done deleting ✅");
};
