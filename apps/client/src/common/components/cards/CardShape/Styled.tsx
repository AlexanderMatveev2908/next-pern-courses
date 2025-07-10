"use client";

import styled from "@emotion/styled";

export const CardShapeStyled = styled.div`
  perspective: 9999px;
  transition: 0.3s box-shadow ease-in-out;

  &:hover {
    box-shadow:
      0 0 5px var(--white__0),
      0 0 10px var(--white__0),
      0 0 15px var(--white__0),
      0 0 20px var(--white__0),
      0 0 25px var(--white__0),
      0 0 30px var(--white__0);
  }

  .flipper {
    transform-style: preserve-3d;
    position: relative;
    height: fit-content;
    transform-style: preserve-3d;
    transform-origin: center;
    will-change: transform;

    .client,
    .server {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      /* background: var(--neutral__950); */
    }

    .client {
      transform: rotateY(0deg);
      background: green;
    }

    .server {
      transform: rotateY(180deg);
      color: var(--white__0);
      background: red;
    }
  }
`;
