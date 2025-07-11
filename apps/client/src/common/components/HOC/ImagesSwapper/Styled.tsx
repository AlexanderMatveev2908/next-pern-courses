"use client";

import { resp } from "@/core/lib/style";
import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  .btn {
    cursor: pointer;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--neutral__200);
    border: 3px solid var(--neutral__800);
    background: var(--neutral__950);
    z-index: 100;
    padding: 10px;
    border-radius: 15px;
    &:hover {
      transform: translateY(-50%) scale(1.3);
    }
    &:active {
      transition: 0.15s;
      transform: translateY(-50%) scale(0.8);
    }

    svg {
      min-width: 30px;
      min-height: 30px;
    }
  }

  ${resp("md")} {
    .btn {
      svg {
        min-width: 40px;
        min-height: 40px;
      }
    }
  }
`;
