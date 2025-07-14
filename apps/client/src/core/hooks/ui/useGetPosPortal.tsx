/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useState } from "react";

type Params = {
  contentRef: RefObject<HTMLElement | null>;
  optDep?: any;
};

export const useGetPosPortal = ({ contentRef, optDep }: Params) => {
  const [posParent, setPosParent] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (!contentRef || typeof contentRef === "function") return;
    const el = contentRef?.current;
    if (!el) return;

    const { top, left } = el.getBoundingClientRect();
    const windowH = window.scrollY;

    setPosParent([top + windowH, left]);
  }, [contentRef, optDep]);

  return {
    posParent,
  };
};
