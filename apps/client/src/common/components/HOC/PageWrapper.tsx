"use client";

import type { FC } from "react";
import TxtClamp from "../elements/TxtClamp/TxtClamp";
import WrapClient from "./WrapClient";

type PropsType = {
  title: string;
  children: React.ReactNode;
  wrapHydrate?: boolean;
};

const PageWrapper: FC<PropsType> = ({ title, children, wrapHydrate }) => {
  return (
    <div className="w-full flex flex-col gap-6 text-gray-300">
      <TxtClamp {...{ txt: title, CSS: "txt__2xl grad__txt" }} />

      {wrapHydrate ? <WrapClient>{children}</WrapClient> : children}
    </div>
  );
};

export default PageWrapper;
