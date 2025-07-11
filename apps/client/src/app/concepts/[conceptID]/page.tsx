import { NextParamPageType } from "@/common/types/api";
import type { FC } from "react";

const page: FC<NextParamPageType<{ conceptID: string }>> = async (
  {
    //   params,
  },
) => {
  //   const { conceptID } = await params;

  return <div></div>;
};

export default page;
