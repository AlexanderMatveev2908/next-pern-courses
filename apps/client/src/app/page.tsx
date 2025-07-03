"use client";

import type { FC } from "react";
import { sum } from "@shared/first/lib/index.js";
import { __cg } from "@shared/first/lib/logger.js";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";

const Home: FC = () => {
  sum();

  __cg("shared cb", 1010);
  return (
    <div className="text-gray-300">
      <RowSwapBtns
        {...{
          currSwap: 0,
          setCurrSwap: () => {},
          totSwaps: 2,
        }}
      />
    </div>
  );
};

export default Home;
