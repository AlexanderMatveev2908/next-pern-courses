/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from "react";

type Params = {
  contentRef: RefObject<HTMLDivElement | null>;
  setMaxH: (val: number) => void;
  optionalDep: any;
};

export const useResizeElementHeight = ({
  contentRef,
  setMaxH,
  optionalDep,
}: Params): void => {
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const listen = () => setMaxH(el.scrollHeight);
    listen();

    const obs = new ResizeObserver(listen);
    obs.observe(el);

    const obsMutation = new MutationObserver(listen);
    obsMutation.observe(el, {
      // ? direct children changes
      childList: true,
      // ? nested children changes
      subtree: true,
      // ? text content changes
      characterData: true,
      // ? eg classname
      attributes: true,
    });

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
      obs.disconnect();
      obsMutation.disconnect();
    };
  }, [setMaxH, contentRef, optionalDep]);
};
