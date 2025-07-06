/** @jsxImportSource @emotion/react */
"use client";

import SearchCtxProvider from "@/features/layout/components/SearchBar/contexts/SearchCtxProvider";
import Searchbar from "@/features/layout/components/SearchBar/Searchbar";
import type { FC } from "react";

const ListCourses: FC = () => {
  return (
    <SearchCtxProvider>
      <div className="w-full grid grid-cols-1 gap-8">
        <Searchbar />
      </div>
    </SearchCtxProvider>
  );
};

export default ListCourses;
