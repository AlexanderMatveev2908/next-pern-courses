import { uiBreaks } from "@/core/constants/uiBreaks";
import { isWindow } from "@/core/lib/etc";
import { useEffect, useState } from "react";

const calcWindowCut = () =>
  !isWindow() ? 0 : window.innerWidth > uiBreaks.lg ? 500 : 0;

export const useCalcCutWindow = () => {
  const [windowCut, setWindowCut] = useState(calcWindowCut());

  useEffect(() => {
    const listen = () => setWindowCut(calcWindowCut());

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  return {
    windowCut,
  };
};
