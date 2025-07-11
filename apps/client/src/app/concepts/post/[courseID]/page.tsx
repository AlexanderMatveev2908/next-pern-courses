import { NextParamPageType } from "@/common/types/api";
import { isOkID } from "@shared/first/lib/validators.js";
import { notFound } from "next/navigation";
import type { FC } from "react";

const page: FC<NextParamPageType<{ courseID: string }>> = async ({
  params,
}) => {
  const { courseID } = await params;

  if (!isOkID(courseID)) notFound();

  return <div className=""></div>;
};

export default page;
