import CoursePage from "@/features/courses/pages/CoursePage/CoursePage";
import { isIdOk } from "@shared/first/lib/validators.js";
import { notFound } from "next/navigation";
import type { FC } from "react";

export const dynamic = "force-dynamic";

type PropsType = {
  params: Promise<{ courseID: string }>;
};

const Page: FC<PropsType> = async ({ params }) => {
  const { courseID } = await params;

  const isValidID = isIdOk(courseID);
  if (!isValidID) notFound();

  return (
    <div className="w-full grid ">
      <CoursePage
        {...{
          courseID,
        }}
      />
    </div>
  );
};

export default Page;
