/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useMemo, useState, type FC } from "react";
import { getColsForSwap, maxRows } from "./uiFactory";
import { useGenIDs } from "@/core/hooks/ui/useGenIDs";
import Swap from "./components/Swap";

type PropsType = {
  vals: string[];
  typeBox: "checkbox" | "radio";
};

const WrapBoxes: FC<PropsType> = ({ vals, typeBox }) => {
  const [colsForSwap, setColsForSwap] = useState(getColsForSwap());

  useEffect(() => {
    const listen = (): void => {
      const updated = getColsForSwap();

      setColsForSwap((prev) => (prev !== updated ? updated : prev));
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  const totSwaps = useMemo(
    () => Math.ceil(vals.length / (colsForSwap * maxRows)),
    [vals, colsForSwap],
  );

  const { ids } = useGenIDs({
    lengths: [totSwaps],
  });

  return (
    <div className="w-full flex flex-col border-[3px] border-neutral-600 rounded-xl p-5">
      {ids[0].map((id, i) => (
        <Swap
          key={id}
          {...{
            vals: vals.slice(i * colsForSwap, i * colsForSwap + colsForSwap),
            typeBox,
          }}
        />
      ))}
    </div>
  );
};

export default WrapBoxes;
