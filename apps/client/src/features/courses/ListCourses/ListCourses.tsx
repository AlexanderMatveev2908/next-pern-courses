/** @jsxImportSource @emotion/react */
"use client";

import { type FC } from "react";
import { coursesSliceAPI } from "../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaGetListCourse,
  SchemaGetListCoursesType,
} from "@shared/first/paperwork/courses/schema.get.js";
import {
  filtersCourses,
  innerJoinFilters,
  sortersCourses,
  txtInputsCourses,
} from "./uifactory/searchBar";
import { v4 } from "uuid";
import { __cg } from "@shared/first/lib/logger.js";
import { useSearchCtxConsumer } from "@/features/layout/components/SearchBar/contexts/hooks/useSearchCtxConsumer";
import { useFactoryAPI } from "@/features/layout/components/SearchBar/hooks/useFactoryAPI";
import { css } from "@emotion/react";
import { resp } from "@/core/lib/style";
import WrapSearchQuery from "@/common/components/HOC/WrapSearchQuery";

const ListCourses: FC = () => {
  const hook = coursesSliceAPI.useLazyGetCoursesQuery();
  const [triggerRTK, res] = hook;
  const { data: { courses } = {} } = res ?? {};

  const { updateNoDebounce } = useSearchCtxConsumer();
  const { triggerRef } = useWrapQuery({
    ...res,
    showToast: true,
  });

  const formCtx = useForm<SchemaGetListCoursesType>({
    resolver: zodResolver(schemaGetListCourse),
    mode: "onChange",
    defaultValues: {
      txtInputs: [{ ...txtInputsCourses[0], id: v4() }],
    },
  });
  const { handleSubmit } = formCtx;

  const { searchAPI } = useFactoryAPI({
    triggerRef,
    triggerRTK,
    updateNoDebounce,
  });

  const handleSave = handleSubmit(
    (data) => {
      searchAPI(data, { syncPending: "submit" });
    },
    (errs) => {
      __cg("errs submit", errs);

      return errs;
    },
  );

  return (
    <WrapSearchQuery
      {...{
        filters: filtersCourses,
        handleSave,
        hook,
        sorters: sortersCourses,
        innerJoinConf: innerJoinFilters,
        txtInputs: txtInputsCourses,
        triggerRef,
        zodObj: schemaGetListCourse,
        formCtx,
      }}
    >
      {() => (
        <div
          className="w-full grid gap-10"
          css={css`
            grid-template-columns: 1fr;

            ${resp(600)} {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
          `}
        >
          {courses?.map((item, i) => (
            <div
              key={i}
              className="border-[3px] border-neutral-600 rounded-xl p-5 min-h-0 max-h-[400px] overflow-y-auto scroll__app"
            >
              <span className="txt__md  break-all">
                {JSON.stringify(item, null, 2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </WrapSearchQuery>
  );
};

export default ListCourses;
