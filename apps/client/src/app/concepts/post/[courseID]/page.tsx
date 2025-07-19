"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { envApp } from "@/core/constants/env";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useCheckID } from "@/core/hooks/useCheckID";
import { genFormData } from "@/core/lib/processForm";
import ConceptForm from "@/features/concepts/forms/ConceptForm/ConceptForm";
import { grabQuestionShape } from "@/features/concepts/forms/ConceptForm/uiFactory";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import {
  FormConceptType,
  schemaPostConcept,
} from "@shared/first/paperwork/concepts/schema.post.js";
import { useEffect, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page: FC = () => {
  const formCtx = useForm<FormConceptType>({
    mode: "onChange",
    resolver: zodResolver(schemaPostConcept),
    defaultValues:
      //   ...(envApp.isDev
      //     ? grabPlaceholderConcept()
      //     : { quiz: [{ ...grabQuestionShape() }] }),
      // },
      { quiz: [{ ...grabQuestionShape() }] },
  });

  const { handleSubmit, setValue } = formCtx;

  const { isValid, id: courseID } = useCheckID({ keyID: "courseID" });

  const res = conceptsSliceAPI.useGrabStatsCourseQuery(courseID as string, {
    skip: !isValid,
  });
  const { isLoading, data } = res;
  const { course } = data ?? {};
  useWrapQuery({
    ...res,
    // showToast: true,
  });

  const isLoadingProxy = false;
  // const { isLoadingProxy } = useZip({
  //   setValue,
  // });

  // const { isLoadingProxy } = useFillAssetsDev({ setValue });

  const [mutate, { isLoading: isMutating }] =
    conceptsSliceAPI.useAddConceptMutation();
  const { wrapMutation } = useWrapMutation();

  const handleSave = handleSubmit(
    async (dataRHF) => {
      const encoded = genFormData(dataRHF);
      const res = await wrapMutation({
        cbAPI: () => mutate({ courseID: courseID as string, data: encoded }),
      });

      if (!res) return;
    },
    (errs) => {
      __cg("errs", errs);
      return errs;
    },
  );

  useEffect(() => {
    if (isObjOK(data?.course))
      setValue("order", data!.course!.conceptsStats!.conceptsCount + "", {
        shouldValidate: true,
      });
  }, [data, setValue]);

  return (
    <WrapPendingClient
      {...{
        isSuccess: isObjOK(course),
        wrapHydrate: true,
        isLoading: isLoading || (envApp.isDev ? isLoadingProxy : false),
        throwErr: true,
      }}
    >
      {() => (
        <FormProvider {...formCtx}>
          <ConceptForm
            {...{ handleSave, course: course!, isPending: isMutating }}
          />
        </FormProvider>
      )}
    </WrapPendingClient>
  );
};

export default Page;
