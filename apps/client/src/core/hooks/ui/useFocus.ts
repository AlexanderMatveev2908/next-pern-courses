import { useCallback, useEffect } from "react";

type Params = {
  cb: () => void;
};

export const useFocus = ({ cb }: Params) => {
  // eslint-disable-next-line
  const memoized = useCallback(() => cb(), []);

  useEffect(() => {
    const t = setTimeout(() => memoized(), 0);

    return () => clearTimeout(t);
  }, [memoized]);
  return {};
};
