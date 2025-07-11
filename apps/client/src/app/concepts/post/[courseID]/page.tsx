"use client";

import ConceptForm from "@/features/concepts/forms/ConceptForm/ConceptForm";
import { zodResolver } from "@hookform/resolvers/zod";
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
  });
  const { handleSubmit } = formCtx;

  const { courseID } = useParams();

  if (!isOkID(courseID as string)) {
    nav.replace("/404");
    return null;
  }

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
    <FormProvider {...formCtx}>
      <ConceptForm {...{ handleSave }} />
    </FormProvider>
  );
};

export default Page;
