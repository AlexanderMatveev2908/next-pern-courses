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
  sortersCourses,
  txtInputsCourses,
} from "./uifactory/searchBar";
import { v4 } from "uuid";
import { __cg } from "@shared/first/lib/logger.js";
import { useSearchCtxConsumer } from "@/features/layout/components/SearchBar/contexts/hooks/useSearchCtxConsumer";
import { useFactoryAPI } from "@/features/layout/components/SearchBar/hooks/useFactoryAPI";
import { css } from "@emotion/react";
import WrapSearchQuery from "@/common/components/HOC/WrapSearchQuery";
import { useSelector } from "react-redux";
import { AppStateTypeSSR } from "@/core/store/store";
import { genURLSearchParams } from "@/core/lib/processForm";
import { gabFormValsPagination } from "@/features/layout/components/SearchBar/lib/style";
import { dynamicFiltersCourses } from "./uifactory/searchBar";
import CourseItem from "./components/CourseItem";

const ListCourses: FC = () => {
  const hook = coursesSliceAPI.useLazyGetCoursesQuery();
  const [triggerRTK, res] = hook;
  const { isUninitialized, data: { courses } = {} } = res ?? {};

  const cachedData = useSelector(
    (state: AppStateTypeSSR) =>
      coursesSliceAPI.endpoints.getCourses.select({
        vals: genURLSearchParams(gabFormValsPagination({ page: 0, limit: 2 })),
      })(state).data,
  );

  const {
    courses: cachedCourses,
    pages: pagesCached,
    nHits: nHitsCached,
  } = cachedData ?? {};

  // __cg("cachedData", cachedData);

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
      searchAPI(data, { syncPending: "submit", resetPagination: true });
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
        txtInputs: txtInputsCourses,
        triggerRef,
        zodObj: schemaGetListCourse,
        formCtx,
        pagesCached,
        nHitsCached,
        dynamicFilters: dynamicFiltersCourses,
      }}
    >
      {({ isHydrated }) => {
        const arg =
          (!isHydrated || isUninitialized ? cachedCourses : courses) ?? [];

        return (
          <div
            className="w-full grid gap-10 justify-items-center"
            css={css`
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            `}
          >
            {arg!.map((course) => (
              <CourseItem key={course.id} {...{ course }} />
            ))}
          </div>
        );
      }}
    </WrapSearchQuery>
  );
};

export default ListCourses;
