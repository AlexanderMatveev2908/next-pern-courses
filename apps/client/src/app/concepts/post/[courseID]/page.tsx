"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { genFormData } from "@/core/lib/processForm";
import ConceptForm from "@/features/concepts/forms/ConceptForm/ConceptForm";
import { grabQuestionShape } from "@/features/concepts/forms/ConceptForm/uiFactory";
import { conceptsSliceAPI } from "@/features/concepts/slices/sliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjOK } from "@shared/first/lib/dataStructure.js";
import { genIpsum } from "@shared/first/lib/etc.js";
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
      title: "concept for taught cookies",
      description: genIpsum(5),
      order: 0 + "",
      pointsGained: 100 + "",
      estimatedTime: 15 + "",
      quiz: Array.from({ length: 3 }).map((_, i) => {
        const item = grabQuestionShape();

        return {
          ...item,
          title: {
            ...item.title,
            val: `Title of question ${i}`,
          },
          question: {
            ...item.question,
            val: `Hard question num ${i}`,
          },
          variants: item.variants.map((v, idx) => ({
            ...v,
            answer: {
              ...v.answer,
              val: `Answer n ${idx} (outer is ${i})`,
            },
            isCorrect: {
              ...v.isCorrect,
              val: !idx,
            },
          })),
        };
      }),
      // quiz: [{ ...grabQuestionShape() }],
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
    showToast: true,
  });

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
        isLoading,
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
