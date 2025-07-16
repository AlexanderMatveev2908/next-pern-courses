import { ConceptType } from "@/features/concepts/types";
import { css } from "@emotion/react";
import { formatMinutes } from "@shared/first/lib/formatters.js";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

export const buttonsHeaderBuilder = (refs: ConceptType["refs"]) =>
  new Map([
    [
      0,
      {
        label: "prev",
        href: refs?.prev?.id,
        Svg: ArrowBigLeftDash,
        $custom: {
          css: css`
            justify-self: start;
          `,
        },
      },
    ],
    [
      1,
      {
        label: "next",
        href: refs?.next?.id,
        Svg: ArrowBigRightDash,
        $custom: {
          css: css`
            justify-self: end;
          `,
        },
      },
    ],
  ]);

export const genInfoConceptPage = (concept: ConceptType) => [
  {
    label: "Order",
    val: concept.order,
  },
  {
    label: "Time estimated",
    val: formatMinutes(concept.estimatedTime),
  },
  {
    label: "Points gained",
    val: concept.pointsGained,
  },
  {
    label: "Question available",
    val: concept.questions.length,
  },
];
