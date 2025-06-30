/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import TxtClamp from "../elements/TxtClamp/TxtClamp";

type PropsType = {
  title: string;
  children: React.ReactNode;
};

const PageWrapper: FC<PropsType> = ({ title, children }) => {
  return (
    <div className="w-full flex flex-col gap-6 text-gray-300">
      <TxtClamp {...{ txt: title, CSS: "txt__xl grad__txt" }} />

      {children}
    </div>
  );
};

export default PageWrapper;
