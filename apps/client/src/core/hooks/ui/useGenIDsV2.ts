import { useEffect, useRef } from "react";
import { v4 } from "uuid";

type Params = {
  lengths: number[];
};

export const useGenIDsV2 = ({ lengths }: Params) => {
  const idsRef = useRef<string[][]>(
    lengths.map((num) => Array.from({ length: num }, () => v4())),
  );
  const prevLengths = useRef<number[]>([]);

  useEffect(() => {
    const shouldRerender =
      lengths.length !== prevLengths.current.length ||
      lengths.some((len, i) => len !== prevLengths.current[i]);

    if (!shouldRerender) return;

    idsRef.current = lengths.map((num) =>
      Array.from({ length: num }, () => v4()),
    );
    prevLengths.current = [...lengths];
  }, [lengths]);

  return {
    ids: idsRef.current,
  };
};
