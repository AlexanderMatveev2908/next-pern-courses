import { ServerModel } from "@/common/types/api";
import { CloudAssetType } from "@/common/types/cloud";
import {
  GradeType,
  StackType,
  TechValType,
} from "@shared/first/constants/categories.js";

export type CourseType = ServerModel<{
  title: string;

  description: string | null;
  markdown: string;

  grade: GradeType;
  stack: StackType;
  tech: TechValType;

  estimatedTime: number;
  pointsGained: number;
  rootLanguage: boolean;

  video: CloudAssetType | null;
  images: CloudAssetType[];
}>;
