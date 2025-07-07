import { css } from "@emotion/react";

export const genStyleFilterLabel = (currFilter: string, name: string) => css`
  transition: all.3s;
  color: var(--${currFilter === name ? "neutral__950" : "white__0"});
  background: var(--${currFilter === name ? "white__0" : "neutral__950"});
`;
