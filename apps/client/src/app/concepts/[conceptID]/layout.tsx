import PageWrapper from "@/common/components/HOC/PageWrapper";
import { PropsDOM } from "@/common/types/api";
import type { FC } from "react";

const Layout: FC<PropsDOM> = ({ children }) => {
  return (
    <PageWrapper {...{ title: "Concept", wrapHydrate: true }}>
      {children}
    </PageWrapper>
  );
};

export default Layout;
