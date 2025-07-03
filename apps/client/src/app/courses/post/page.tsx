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
import { useDispatch } from "react-redux";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { ApiEventType } from "@/common/types/api";

const PostCourse: FC = () => {
  const formCtx = useForm<CourseFormType>({
    resolver: zodResolver(schemaCoursePost),
    mode: "onChange",
    defaultValues: {
      tags: [genTagField(0)],
    },
  });

  const { handleSubmit } = formCtx;

  const dispatch = useDispatch();
  const handleSave = handleSubmit(
    (data: CourseFormType) => {
      // __cg("data", data);

      dispatch(
        toastSlice.actions.open({
          type: ApiEventType.success,
          msg: "",
        }),
      );
    },
    (err) => {
      __cg("err", err);

      dispatch(
        toastSlice.actions.open({
          type: ApiEventType.error,
          msg: "",
        }),
      );
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
