import { FieldDataType } from "@/common/types/uiFactory";
import { FieldGenerator } from "@/core/uiFactory/forms";
import { CourseType } from "@/features/courses/types/courses";
import { formatMinutes } from "@shared/first/lib/formatters.js";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import { ArrayPath, Path } from "react-hook-form";
import { v4 } from "uuid";

const gen = new FieldGenerator<FormConceptType, Path<FormConceptType>>(
  "Concept",
);
const timeField = gen.genHardCode("estimatedTime", {
  label: "Estimated Time",
  type: "text",
  required: true,
});
const pointsField = gen.genHardCode("pointsGained", {
  label: "Points gained",
  type: "text",
  required: true,
});

const orderField = gen.genHardCode("order", {
  label: "Order concept",
  type: "text",
  required: true,
});

export const grabNotice = (course: Partial<CourseType>) => {
  const {
    conceptsStats: { conceptsCount, conceptsPoints, conceptsTime } = {},
  } = course;

  return new Map([
    ["estimatedTime", `Course until now last ${formatMinutes(conceptsTime!)}`],
    ["pointsGained", `Course until now provide ${conceptsPoints} points`],
    ["order", `Concept in index order is ${conceptsCount}`],
  ]);
};

export const numericFieldsConcept = [timeField, pointsField, orderField];

export const grabAnswerShape = (i: number) => ({
  id: v4(),
  field: "variants",
  answer: gen.genArrFieldTxt("answer" as ArrayPath<FormConceptType>, {
    field: "variants" as Path<FormConceptType>,
    label: `${i}. Answer`,
    type: "text",
    place: `Answer n.${i}`,
    required: true,
  }),
  isCorrect: gen.genArrFieldBool("isCorrect", {
    field: "variants",
    label: `${i}. Answer`,
  }),
});

export const grabQuestionShape = () => ({
  id: v4(),
  field: "quiz",
  title: gen.genArrFieldTxt("title" as ArrayPath<FormConceptType>, {
    field: "quiz",
    type: "text",
    required: true,
  }),
  question: {
    ...gen.genArrFieldTxt("question" as ArrayPath<FormConceptType>, {
      field: "quiz",
      type: "text" as Exclude<FieldDataType, "file">,
      required: true,
    }),
  },

  variants: [...Array.from({ length: 5 }).map((_, i) => grabAnswerShape(i))],
});

export const fieldQuiz: {
  name: ArrayPath<FormConceptType>;
  label: string;
} = { name: "quiz", label: "Quiz (3-10) *" };
