import { ServerModel } from "@/common/types/api";
import { CloudAssetType } from "@/common/types/cloud";

export type CourseType = ServerModel<{
  title: string;
  techStack: string;
  tools: string;
  tags: string[];

  description: string | null;
  markdown: string | null;

  video: CloudAssetType | null;
  images: CloudAssetType[];
}>;
