"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import ConceptForm from "@/features/concepts/forms/ConceptForm/ConceptForm";
import { grabQuestionShape } from "@/features/concepts/forms/ConceptForm/uiFactory";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { isOkID } from "@shared/first/lib/validators.js";
import {
  FormConceptType,
  schemaPostConcept,
} from "@shared/first/paperwork/concepts/schema.post.js";
import { useParams, useRouter } from "next/navigation";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page: FC = () => {
  const nav = useRouter();

  const formCtx = useForm<FormConceptType>({
    mode: "onChange",
    resolver: zodResolver(schemaPostConcept),
    defaultValues: {
      quiz: [{ ...grabQuestionShape() }],
    },
  });
  const { handleSubmit } = formCtx;

  const { courseID } = useParams();
  const isValid = isOkID(courseID as string);

  if (!isValid) {
    nav.replace("/404");
  }

  const res = conceptsSliceAPI.useGrabStatsCourseQuery(courseID as string, {
    skip: !isValid,
  });
  const { isLoading, data } = res;
  const { course } = data ?? {};
  useWrapQuery({
    ...res,
    showToast: true,
  });

  const handleSave = handleSubmit(
    async (dataRHF) => {
      __cg("dataRHF", dataRHF);
    },
    (errs) => {
      __cg("errs", errs);
      return errs;
    },
  );

  return (
    <WrapPendingClient
      {...{
        isSuccess: isObjOK(course),
        wrapHydrate: true,
        isLoading,
        Content: () => (
          <FormProvider {...formCtx}>
            <ConceptForm {...{ handleSave }} />
          </FormProvider>
        ),
        throwErr: true,
      }}
    />
  );
};

export default Page;
