/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from "react";

type Params = {
  optionalDep: any[];
  contentRef: RefObject<HTMLDivElement | null>;
  setMaxH: (val: number) => void;
};

export const useResizeElementHeight = ({
  contentRef,
  setMaxH,
  optionalDep = [],
}: Params): void => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMaxH, contentRef, ...optionalDep]);
};
