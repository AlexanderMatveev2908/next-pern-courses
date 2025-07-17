/** @jsxImportSource @emotion/react */
"use client";

import SpinnerBtn from "@/common/components/spinners/SpinnerBtn";
import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const ColSide: FC<PropsType> = ({ children, isLoading }) => {
  return (
    <div className="w-full min-w-full h-full max-h-full flex flex-col  overflow-y-auto text-white px-4 pb-6">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <SpinnerBtn />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ColSide;
