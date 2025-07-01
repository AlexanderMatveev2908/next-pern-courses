"use client";

import PageWrapper from "@/common/components/HOC/PageWrapper";
import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
};

const Layout: FC<PropsType> = ({ children }) => {
  return (
    <PageWrapper {...{ title: "Create course", wrapHydrate: true }}>
      {children}
    </PageWrapper>
  );
};

export default Layout;
