"use client";

import { resp } from "@/core/lib/style";
import styled from "@emotion/styled";

export const SpinnerStyled = styled.div`
  .__wrap {
    min-height: 75vw;

    ${resp("sm")} {
      min-height: 50vh;
    }

    ${resp("lg")} {
      min-height: 60vh;
    }
  }

  .__dot {
    transform: scale(0);
    opacity: 0;
    position: absolute;
    content: "";
    background: #f5f5f5;
    box-shadow: 0 0 10px #f5f5f5, 0 0 20px #f5f5f5, 0 0 30px #f5f5f5,
      0 0 40px #f5f5f5, 0 0 50px #f5f5f5;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;

    ${resp(400)} {
      width: 40px;
      height: 40px;
    }

    ${resp("md")} {
      width: 50px;
      height: 50px;
    }
  }
`;
