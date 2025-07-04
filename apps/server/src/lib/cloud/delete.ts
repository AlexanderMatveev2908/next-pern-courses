import { __cg } from "@shared/first/lib/logger.js";
import { cloud } from "src/conf/cloud.js";

export const delCloud = async (ids: string[], resource: "image" | "video") => {
  try {
    const res = await cloud.api.delete_resources(ids, {
      resource_type: resource,
      invalidate: true,
    });

    __cg("cloud delete result", res);
  } catch (err) {
    __cg("cloud delete error", err);
  }
};
