import { ServerModel } from "./api";

export type CloudAssetType = ServerModel<{
  url: string;
  publicID: string;
  type: "IMAGE" | "VIDEO";

  entityID: string;
  entityType: "COURSE" | "TEST";
}>;
