import { RefObject, useCallback, useEffect } from "react";

type Params = {
  ref: RefObject<HTMLElement | null>;
  cb: () => void;
};

export const useMouseOut = ({ ref, cb }: Params) => {
  const memoized = useCallback(() => cb(), [cb]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) memoized();
    };

    document.addEventListener("mousedown", handleMouse);
    return () => {
      document.removeEventListener("mousedown", handleMouse);
    };
  }, [ref, memoized]);
};
