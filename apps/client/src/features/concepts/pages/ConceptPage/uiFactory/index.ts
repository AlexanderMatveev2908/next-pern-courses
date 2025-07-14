import { ConceptType } from "@/features/concepts/types";
import { css } from "@emotion/react";
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
