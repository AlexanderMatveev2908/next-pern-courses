import { resp } from "@/core/lib/style";
import { css } from "@emotion/react";

export const optGridQuiz = css`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
  column-gap: 2.5rem;

  ${resp("md")} {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
