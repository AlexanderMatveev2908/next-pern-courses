/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import WrapImpBtns from "./HOC/WrapImpBtns";

const ThirdRawBtns: FC = ({}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-6">
      <WrapImpBtns />
    </div>
  );
};

export default ThirdRawBtns;
