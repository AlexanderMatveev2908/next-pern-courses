import { useCallback, useEffect } from "react";

type Params = {
  cb: () => void;
};

export const useFocus = ({ cb }: Params) => {
  const memoized = useCallback(() => cb(), [cb]);

  useEffect(() => {
    const t = setTimeout(() => memoized(), 0);

    return () => clearTimeout(t);
  }, [memoized]);
  return {};
};
