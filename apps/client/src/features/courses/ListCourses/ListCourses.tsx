/** @jsxImportSource @emotion/react */
"use client";

import SearchCtxProvider from "@/features/layout/components/SearchBar/contexts/SearchCtxProvider";
import Searchbar from "@/features/layout/components/SearchBar/Searchbar";
import { useEffect, type FC } from "react";
import { coursesSliceAPI } from "../slices/apiSlice";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";

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

  return (
    <SearchCtxProvider>
      <div className="w-full grid grid-cols-1 gap-8">
        <Searchbar {...{ hook }} />
      </div>
    </SearchCtxProvider>
  );
};

export default ListCourses;
