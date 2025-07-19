import { isWindow } from "@/core/lib/etc";
import { css } from "@emotion/react";

export const grabImgWSlider = () =>
  !isWindow() ? 200 : window.innerWidth > 850 ? 300 : 200;

export const genSizeCSS = (size: number) => css`
  ${["min-height", "max-height", "min-width", "max-width"]
    .map((k) => `${k}: ${size}px;`)
    .join("\n")}
`;

export const getImgParSwap = (sizeImg: number, exception: number = 0) =>
  !isWindow()
    ? 1
    : Math.max(1, Math.floor((window.innerWidth - 200 - exception) / sizeImg));
