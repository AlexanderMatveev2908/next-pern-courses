"use client";

import WrapPendingClient from "@/common/components/HOC/WrapPendingClient";
import { useParams } from "next/navigation";
import type { FC } from "react";

const Page: FC = () => {
  const { conceptID } = useParams();

  return (
    <WrapPendingClient
      {...{
        title: conceptID as string,
        waitHydration: true,
        isLoading: false,
      }}
    >
      {() => <div className=""></div>}
    </WrapPendingClient>
  );
};

export default Page;
