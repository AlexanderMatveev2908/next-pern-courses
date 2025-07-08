/** @jsxImportSource @emotion/react */
"use client";

import Searchbar from "@/features/layout/components/SearchBar/Searchbar";
import { useCallback, type FC } from "react";
import { coursesSliceAPI } from "../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
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
import { genURLSearchParams } from "@/core/lib/processForm";
import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useSearchCtxConsumer } from "@/features/layout/components/SearchBar/contexts/hooks/useSearchCtxConsumer";
import { gabFormValsPagination } from "@/features/layout/components/SearchBar/lib/style";
import cloneDeep from "lodash.clonedeep";

const ListCourses: FC = () => {
  const hook = coursesSliceAPI.useLazyGetCoursesQuery();
  const [triggerRTK, res] = hook;

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

  const searchAPI = useCallback(
    <T extends FieldValues>(
      data: T,
      { page, limit }: { page?: number; limit?: number },
    ) => {
      const merged = cloneDeep({
        ...data,
        ...gabFormValsPagination({ page, limit }),
      });

      const str = genURLSearchParams(merged);

      triggerRef();
      updateNoDebounce({
        vals: merged,
      });
      triggerRTK({ vals: str, _: Date.now() }, false);
    },
    [triggerRef, triggerRTK, updateNoDebounce],
  );

  const handleSave = handleSubmit(
    (data) => {
      searchAPI(data, {});
    },
    (errs) => {
      __cg("errs submit", errs);

      return errs;
    },
  );

  return (
    <div className="w-full grid grid-cols-1 gap-20">
      <FormProvider {...formCtx}>
        <Searchbar
          {...{
            hook,
            txtInputs: txtInputsCourses,
            filters: filtersCourses,
            sorters: sortersCourses,
            innerJoinConf: innerJoinFilters,
            handleSave,
            zodObj: schemaGetListCourse,
            triggerRef,
          }}
        />
      </FormProvider>

      <WrapPendingClient {...{ isLoading: res.isLoading }}>
        {() => (
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            harum, alias minus fuga molestiae non ea voluptas atque ducimus sint
            veniam iure aliquid ipsa exercitationem pariatur deserunt tenetur
            eos consectetur.
          </div>
        )}
      </WrapPendingClient>
    </div>
  );
};

export default ListCourses;
