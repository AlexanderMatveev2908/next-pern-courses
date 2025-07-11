import PageWrapper from "@/common/components/HOC/PageWrapper";
import { PropsDOM } from "@/common/types/api";
import type { FC } from "react";

const layout: FC<PropsDOM> = ({ children }) => {
  return (
    <PageWrapper {...{ title: "Add Concept", wrapHydrate: true }}>
      {children}
    </PageWrapper>
  );
};

export default layout;
