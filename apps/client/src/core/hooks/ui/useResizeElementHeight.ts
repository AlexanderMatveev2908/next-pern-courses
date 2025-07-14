/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { __cg } from "@shared/first/lib/logger.js";
import { RefObject, useEffect } from "react";

type Params = {
  contentRef: RefObject<HTMLDivElement | null>;
  setMaxH: (val: number) => void;
};

export const useResizeElementHeight = (
  { contentRef, setMaxH }: Params,
  ...optionalDep: any[]
): void => {
  __cg("opt", optionalDep);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const listen = () => setMaxH(el.scrollHeight);
    listen();

    const obs = new ResizeObserver(listen);
    obs.observe(el);
    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
      obs.disconnect();
    };
  }, [setMaxH, contentRef, ...optionalDep]);
};
