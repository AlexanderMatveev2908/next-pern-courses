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
import { genTagField } from "@/core/forms/CourseForm/uiFactory";

const PostCourse: FC = () => {
  const formCtx = useForm<CourseFormType>({
    resolver: zodResolver(schemaCoursePost),
    mode: "onChange",
    defaultValues: {
      tags: [genTagField(0)],
    },
  });

  const { handleSubmit } = formCtx;

  const handleSave = handleSubmit(
    (data: CourseFormType) => {
      __cg("data", data);
    },
    (err) => {
      __cg("err", err);

      return err;
    },
  );

  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <FormProvider {...formCtx}>
        <CourseForm {...{ handleSave }} />
      </FormProvider>
    </div>
  );
};

export default PostCourse;
