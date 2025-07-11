import { FieldGenerator } from "@/core/uiFactory/forms";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import { Path } from "react-hook-form";

const gen = new FieldGenerator<FormConceptType, Path<FormConceptType>>(
  "Concept",
);
const timeField = gen.genHardCode(
  "estimatedTime",
  "Estimated Time",
  "text",
  true,
);
const pointsField = gen.genHardCode(
  "pointsGained",
  "Points gained",
  "text",
  true,
);

const orderField = gen.genHardCode("order", "Order concept", "text", true);

export const numericFieldsConcept = [timeField, pointsField, orderField];
