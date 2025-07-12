"use client";

import type { FC } from "react";
import WrapClient from "./WrapClient";
import PrependTitle from "./PrependTitle";

type PropsType = {
  title: string;
  children: React.ReactNode;
  wrapHydrate?: boolean;
};

const PageWrapper: FC<PropsType> = ({ title, children, wrapHydrate }) => {
  return (
    <PrependTitle {...{ title }}>
      {wrapHydrate ? <WrapClient>{children}</WrapClient> : children}
    </PrependTitle>
  );
};

export default PageWrapper;
