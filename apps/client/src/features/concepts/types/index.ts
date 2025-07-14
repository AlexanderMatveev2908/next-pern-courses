import { ServerModel } from "@/common/types/api";
import { CloudAssetType } from "@/common/types/cloud";
import { CourseType } from "@/features/courses/types/courses";

export type VariantType = ServerModel<{
  quizID: string;
  quiz: QuizType;

  answer: string;
  isCorrect: boolean;
}>;

export type QuizType = ServerModel<{
  conceptID: string;
  concept: ConceptType;

  title: string;
  question: string;

  variants: VariantType[];
}>;

export type ConceptType = ServerModel<{
  courseID: string;
  course: CourseType;

  title: string;
  description?: string | null;
  markdown: string;

  estimatedTime: number;
  pointsGained: number;
  order: number;

  quizzes: QuizType[];

  images: CloudAssetType[];
}>;
