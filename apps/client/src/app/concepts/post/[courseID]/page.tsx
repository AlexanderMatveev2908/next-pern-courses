import { NextParamPageType } from "@/common/types/api";
import { __cg } from "@shared/first/lib/logger.js";
import type { FC } from "react";

const page: FC<NextParamPageType<{ courseID: string }>> = async ({
  params,
}) => {
  const { courseID } = await params;

  __cg("id", courseID);
  return <div className=""></div>;
};

export default page;
