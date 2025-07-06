import ListCourses from "@/features/courses/ListCourses/ListCourses";
import type { FC } from "react";

const Page: FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <ListCourses />
    </div>
  );
};

export default Page;
