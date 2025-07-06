/** @jsxImportSource @emotion/react */
"use client";

import Searchbar from "@/features/layout/components/SearchBar/Searchbar";
import { useEffect, type FC } from "react";
import { coursesSliceAPI } from "../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaGetListCourse,
  SchemaGetListCoursesType,
} from "@shared/first/paperwork/courses/schema.get.js";
import { mainFieldSearch, txtInputsCourses } from "./uifactory/searchBar";
import { __cg } from "@shared/first/lib/logger.js";
import { useFocus } from "@/core/hooks/ui/useFocus";
import { v4 } from "uuid";

const ListCourses: FC = () => {
  const hook = coursesSliceAPI.useLazyGetCoursesQuery();
  const [triggerRTK, res] = hook;

  useWrapQuery({
    ...res,
    showToast: true,
  });

  const vals = new URLSearchParams();
  vals.append("msg", "test form");

  useEffect(() => {
    triggerRTK({
      vals: vals + "",
    });
    // eslint-disable-next-line
  }, [triggerRTK]);

  const formCtx = useForm<SchemaGetListCoursesType>({
    resolver: zodResolver(schemaGetListCourse),
    mode: "onChange",
    defaultValues: {
      txtInputs: [{ ...txtInputsCourses[0], id: v4() }],
    },
  });

  __cg("form vals", formCtx.watch());

  return (
    <div className="w-full grid grid-cols-1 gap-8">
      <FormProvider {...formCtx}>
        <Searchbar {...{ hook, txtInputs: txtInputsCourses }} />
      </FormProvider>
    </div>
  );
};

export default ListCourses;
