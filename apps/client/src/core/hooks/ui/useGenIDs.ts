import { useMemo } from "react";
import { v4 } from "uuid";

type Params = {
  lengths?: (number | undefined)[];
};

export const useGenIDs = ({ lengths = [0] }: Params) => {
  const ids = useMemo(() => {
    const filtered = lengths.filter((x): x is number => typeof x === "number");

    return Array.from({ length: filtered.length }, (_, i) =>
      Array.from({ length: filtered[i] }, () => v4())
    );
  }, [lengths]);

  return { ids };
};
