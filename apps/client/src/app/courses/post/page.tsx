"use client";

import {
  CourseFormType,
  schemaCoursePost,
} from "@shared/first/paperwork/courses/schema.post";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { __cg } from "@shared/first/lib/logger";
import CourseForm from "@/core/forms/CourseForm/CourseForm";
import { genFormData } from "@/core/lib/processForm";
import { coursesSliceAPI } from "@/features/courses/slices/apiSlice";
import { useWrapMutation } from "@/core/hooks/api/useWrapMutation";

const PostCourse: FC = () => {
  const formCtx = useForm<CourseFormType>({
    resolver: zodResolver(schemaCoursePost),
    mode: "onChange",
  });

  const [mutate, { isLoading }] = coursesSliceAPI.usePostCourseMutation();
  const { wrapMutation } = useWrapMutation();
  const { handleSubmit, setFocus } = formCtx;

  const handleSave = handleSubmit(
    async (data: CourseFormType) => {
      const formData = genFormData(data);

      const res = await wrapMutation({
        cbAPI: () => mutate(formData as FormData),
      });

      if (!res) return;
    },
    (err) => {
      __cg("err", err);
      const keys = Object.keys(err);

      for (const k of keys) {
        if (["markdown", "video", "grade", "techStack", "tools"].includes(k)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setFocus((k + "_a") as any);
          break;
        }
      }

      return err;
    },
  );

  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <FormProvider {...formCtx}>
        <CourseForm {...{ handleSave, isLoading }} />
      </FormProvider>
    </div>
  );
};

export default PostCourse;
