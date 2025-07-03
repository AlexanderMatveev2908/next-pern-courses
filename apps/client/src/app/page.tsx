"use client";

import type { FC } from "react";
import RowSwapBtns from "@/common/components/HOC/RowSwapBtns/RowSwapBtns";

const Home: FC = () => {
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
