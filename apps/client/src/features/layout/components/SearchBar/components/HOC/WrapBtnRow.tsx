/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
};

const WrapBtnRow: FC<PropsType> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-2 lg:order-[0] justify-items-center gap-10">
      {children}
    </div>
  );
};

export default WrapBtnRow;
