import { useEffect, useState } from "react";
import { handleShowLabel } from "../lib/style";

type Params = {
  width: number;
};

export const useListenCondLabel = ({ width }: Params) => {
  const [showLabel, setShowLabel] = useState(handleShowLabel(width));

  useEffect(() => {
    const listen = () => {
      setShowLabel(handleShowLabel(width));
    };

    window.addEventListener("resize", listen);
    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [width]);

  return {
    showLabel,
  };
};
