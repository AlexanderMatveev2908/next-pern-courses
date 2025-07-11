import { FieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import { Path } from "react-hook-form";

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
