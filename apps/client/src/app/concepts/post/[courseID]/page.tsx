"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { envApp } from "@/core/constants/env";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { b64ToFile } from "@/core/lib/etc";
import { genFormData } from "@/core/lib/processForm";
import ConceptForm from "@/features/concepts/forms/ConceptForm/ConceptForm";
import { grabPlaceholderConcept } from "@/features/concepts/forms/ConceptForm/lib";
import { grabQuestionShape } from "@/features/concepts/forms/ConceptForm/uiFactory";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { proxySliceAPI } from "@/features/rootDev/slices/proxyAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { isOkID } from "@shared/first/lib/validators.js";
import {
  FormConceptType,
  schemaPostConcept,
} from "@shared/first/paperwork/concepts/schema.post.js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page: FC = () => {
  const nav = useRouter();

  const formCtx = useForm<FormConceptType>({
    mode: "onChange",
    resolver: zodResolver(schemaPostConcept),
    defaultValues: {
      ...(envApp.isDev
        ? grabPlaceholderConcept()
        : { quiz: [{ ...grabQuestionShape() }] }),
    },
  });
  const { handleSubmit, setValue } = formCtx;

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
    // showToast: true,
  });
  const resProxy = proxySliceAPI.useGrabServerAssetsQuery(
    {},
    {
      skip: !envApp.isDev,
    },
  );
  const { data: dataAssets, isLoading: isLoadingProxy } = resProxy;
  const { b64Arg } = dataAssets ?? [];
  useWrapQuery({
    ...resProxy,
    showToast: envApp.isDev,
  });

  useEffect(() => {
    if (!isArrOK(b64Arg)) return;

    const handleAssets = async () => {
      const argFiles: File[] = [];

      for (const b of b64Arg) {
        const f = await b64ToFile(b);

        argFiles.push(f);
      }

      setValue("images", argFiles, {
        shouldValidate: true,
      });
    };

    handleAssets();
  }, [b64Arg, setValue]);

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
        Content: () => (
          <FormProvider {...formCtx}>
            <ConceptForm
              {...{ handleSave, course: course!, isPending: isMutating }}
            />
          </FormProvider>
        ),
        throwErr: true,
      }}
    />
  );
};

export default Page;
