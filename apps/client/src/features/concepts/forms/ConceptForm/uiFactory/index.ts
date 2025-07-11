import { FieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import { Path } from "react-hook-form";
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

export const numericFieldsConcept = [timeField, pointsField, orderField];

export const questionShape = {
  title: {
    id: v4(),
    name: "title",
    label: "Title question",
    type: "text",
    val: "",
    required: true,
  },
  question: {
    id: v4(),
    name: "question",
    label: "Question",
    type: "text",
    val: "",
    required: true,

    variants: [
      ...Array.from({ length: 5 }, () => v4()).map((id, i) => ({
        answer: {
          id,
          name: "answer",
          label: "Answer",
          type: "text",
          required: true,
          val: "",
        },
      })),
    ],
  },
};
