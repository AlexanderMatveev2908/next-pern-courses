import { formatMinutes } from "@shared/first/lib/formatters.js";
import { ConceptType } from "../types";

export const genRowsInfoConcept = (cpt: ConceptType) => [
  {
    label: "Order",
    val: cpt.order + 1,
  },
  {
    label: "Time estimated",
    val: formatMinutes(cpt.estimatedTime),
  },
  {
    label: "Points gained",
    val: cpt.pointsGained,
  },
  {
    label: "Quizzes available",
    val: cpt.quizzes.length,
  },
  {
    label: "Video lection",
    val: cpt.hasVideo + "",
  },
];
