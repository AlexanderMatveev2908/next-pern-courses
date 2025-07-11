import CoursePage from "@/features/courses/pages/CoursePage/CoursePage";
import { isOkID } from "@shared/first/lib/validators.js";
import { notFound } from "next/navigation";
import type { FC } from "react";

export const dynamic = "force-dynamic";

type PropsType = {
  params: Promise<{ courseID: string }>;
};

const Page: FC<PropsType> = async ({ params }) => {
  const { courseID } = await params;

  const isValidID = isOkID(courseID);
  if (!isValidID) notFound();

  return (
    <CoursePage
      {...{
        courseID,
      }}
    />
  );
};

export default Page;
