"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useCheckID } from "@/core/hooks/useCheckID";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import type { FC } from "react";

const Page: FC = () => {
  const { isValid, id: conceptID } = useCheckID({ keyID: "conceptID" });

  const res = conceptsSliceAPI.useGetConceptByIDQuery(conceptID, {
    skip: !isValid,
  });
  useWrapQuery({
    ...res,
    showToast: true,
  });

  return (
    <WrapPendingClient
      {...{
        title: conceptID as string,
        waitHydration: true,
        isLoading: false,
      }}
    >
      {() => <div className=""></div>}
    </WrapPendingClient>
  );
};

export default Page;
