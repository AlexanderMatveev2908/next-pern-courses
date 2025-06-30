/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  txt: string;
  CSS?: string;
};

const TxtScroll: FC<PropsType> = ({ txt, CSS }) => {
  return (
    <div className="scroll__app flex w-full max-w-full h-fit overflow-x-auto py-2">
      <span className={`text-nowrap ${CSS ?? "txt__lg text-gray-300"}`}>
        {txt}
      </span>
    </div>
  );
};

export default TxtScroll;
