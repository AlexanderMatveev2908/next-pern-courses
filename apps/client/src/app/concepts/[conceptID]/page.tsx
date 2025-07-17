"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useCheckID } from "@/core/hooks/useCheckID";
import ConceptPage from "@/features/concepts/pages/ConceptPage/ConceptPage";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import type { FC } from "react";
import { $pageWithSideCSS } from "@/core/uiFactory/style";

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
    <div className="w-full grid">
      <WrapPendingClient
        {...{
          waitHydration: true,
          isLoading,
          isSuccess: isObjOK(concept),
          $customCSS: $pageWithSideCSS,
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
    </div>
  );
};

export default Page;
