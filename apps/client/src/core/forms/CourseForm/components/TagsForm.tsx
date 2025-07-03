/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import type { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const TagsForm: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CourseFormType>();

  const { append, fields, remove } = useFieldArray<CourseFormType, "tags">({
    control,
    name: "tags",
  });

  return (
    <div className="w-full max-w-full grid grid-cols-1 gap-4">
      <span className="txt__lg text-neutral-200">Tags (0-5)</span>

      <div className="w-full grid grid-cols-1 gap-3 justify-items-center">
        {(fields ?? []).map((el, i) => (
          <FormFieldTxt
            key={el.id}
            {...({
              control,
              el,
              showLabel: false,
              errors,
              index: i,
            } as any)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
