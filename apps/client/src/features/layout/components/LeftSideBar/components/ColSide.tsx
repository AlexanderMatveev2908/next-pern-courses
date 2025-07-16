/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
};

const ColSide: FC<PropsType> = ({ children }) => {
  return (
    <div className="w-full min-w-full h-full max-h-full flex flex-col  overflow-y-auto text-white px-4 pb-6">
      {children}
    </div>
  );
};

export default ColSide;
