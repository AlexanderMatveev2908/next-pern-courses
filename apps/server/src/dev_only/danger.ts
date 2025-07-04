import { __cg } from "@shared/first/lib/logger.js";
import { cloud } from "src/conf/cloud.js";
import db from "src/conf/db.js";

export const DEL_ALL = async () => {
  __cg("start deleting 🕰️");

  await db.cloudAsset.deleteMany();
  await db.course.deleteMany();

  await cloud.api.delete_resources_by_prefix("next_pern_courses__", {
    resource_type: "image",
  });

  await cloud.api.delete_resources_by_prefix("next_pern_courses__", {
    resource_type: "video",
  });

  __cg("done deleting ✅");
};
