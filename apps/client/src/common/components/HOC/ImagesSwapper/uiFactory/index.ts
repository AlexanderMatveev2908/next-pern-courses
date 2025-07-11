import { isWindow } from "@/core/lib/etc";
import { css } from "@emotion/react";

export const grabImgWSlider = () =>
  !isWindow() ? 200 : window.innerWidth > 850 ? 300 : 200;

export const genSizeCSS = (size: number) => css`
  ${["min-height", "max-height", "min-width", "max-width"]
    .map((k) => `${k}: ${size}px;`)
    .join("\n")}
`;

export const getImgParSwap = () =>
  !isWindow()
    ? 1
    : window.innerWidth > 1650
      ? 4
      : window.innerWidth > 1250
        ? 3
        : window.innerWidth > 550
          ? 2
          : 1;
