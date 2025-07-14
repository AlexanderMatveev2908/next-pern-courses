"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useCheckID } from "@/core/hooks/useCheckID";
import ConceptPage from "@/features/concepts/pages/ConceptPage/ConceptPage";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import type { FC } from "react";

const Page: FC = () => {
  const { isValid, id: conceptID } = useCheckID({ keyID: "conceptID" });

  const res = conceptsSliceAPI.useGetConceptByIDQuery(conceptID, {
    skip: !isValid,
  });
  const { isLoading, data: { concept } = {} } = res;
  useWrapQuery({
    ...res,
    showToast: true,
  });

  return (
    <WrapPendingClient
      {...{
        waitHydration: true,
        isLoading,
        isSuccess: isObjOK(concept),
      }}
    >
      {() => (
        <ConceptPage
          {...{
            concept: concept!,
          }}
        />
      )}
    </WrapPendingClient>
  );
};

export default Page;
