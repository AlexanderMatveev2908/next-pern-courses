import { ServerModel } from "@/common/types/api";
import { CloudAssetType } from "@/common/types/cloud";
import { CourseType } from "@/features/courses/types/courses";

export type VariantType = ServerModel<{
  questionID: string;
  question: QuestionType;

  answer: string;
  isCorrect: boolean;
}>;

export type QuestionType = ServerModel<{
  conceptID: string;
  concept: ConceptType;

  title: string;
  question: string;

  variants: VariantType[];
}>;

export type UserAnswerType = ServerModel<{
  userConceptID: string;
  userConcept: UserConceptType;

  variantID: string;
  questionID: string;

  variant: VariantType;
  question: QuestionType;

  isCorrect: boolean;

  correctAnswer?: {
    id: string;
    answer: string;
  } | null;
}>;

export type UserConceptType = ServerModel<{
  conceptID: string;
  concept: ConceptType;

  score: number;

  userAnswers: UserAnswerType[];
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

  questions: QuestionType[];
  isCompleted: boolean;

  images: CloudAssetType[];
  video?: CloudAssetType | null;

  userConcepts: UserConceptType[];
  userConcept: UserConceptType | null;

  hasVideo?: boolean;
  refs?: {
    conceptsCount: number;
    prev: Partial<ConceptType> | null;
    next: Partial<ConceptType> | null;
  };
}>;
