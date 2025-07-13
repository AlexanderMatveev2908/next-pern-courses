import ListCourses from "@/features/courses/pages/ListCourses/ListCourses";
import SearchCtxProvider from "@/features/layout/components/SearchBar/contexts/SearchCtxProvider";
import type { FC } from "react";

export const dynamic = "force-dynamic";

const Page: FC = () => {
  return (
    <SearchCtxProvider>
      <ListCourses />
    </SearchCtxProvider>
  );
};

export default Page;
