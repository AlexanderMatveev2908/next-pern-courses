import { useEffect, useRef, useState } from "react";
import { useMouseOut } from "./useMouseOut";

type Params = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useHandleDrop = ({ setIsOpen }: Params) => {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [minH, setMinH] = useState(0);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;

    const resize = () => setMinH(labelRef?.current?.scrollHeight ?? 0);

    const observer = new ResizeObserver(resize);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useMouseOut({
    ref: containerRef,
    cb: () => setIsOpen(false),
  });

  return {
    labelRef,
    containerRef,
    minH,
  };
};
