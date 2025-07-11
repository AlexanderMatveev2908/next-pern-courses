import ListCourses from "@/features/courses/pages/ListCourses/ListCourses";
import SearchCtxProvider from "@/features/layout/components/SearchBar/contexts/SearchCtxProvider";
import type { FC } from "react";

export const dynamic = "force-dynamic";

const Page: FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <SearchCtxProvider>
        <ListCourses />
      </SearchCtxProvider>
    </div>
  );
};

export default Page;
