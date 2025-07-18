/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useState } from "react";
import { useListenHydration } from "../api/useListenHydration";

type Params = {
  contentRef: RefObject<HTMLElement | null>;
  optDep?: any;
};

export const useGetPosPortal = ({ contentRef, optDep }: Params) => {
  const [posParent, setPosParent] = useState<[number, number]>([0, 0]);

  const { isHydrated } = useListenHydration();

  useEffect(() => {
    if (!isHydrated || !contentRef?.current || typeof contentRef === "function")
      return;
    const el = contentRef.current;

    const listen = () => {
      const { top, left } = el.getBoundingClientRect();
      const windowH = window.scrollY;

      setPosParent([top + windowH, left]);
    };
    listen();

    const obs = new ResizeObserver(listen);
    obs.observe(el);

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
      obs.disconnect();
    };
  }, [contentRef, optDep, isHydrated]);

  return {
    posParent,
  };
};
