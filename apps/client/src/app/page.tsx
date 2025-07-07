import { envApp } from "@/core/constants/env";
import WakeUp from "@/features/wakeUp/components/WakeUp/WakeUp";
import { __cg } from "@shared/first/lib/logger.js";
import type { FC } from "react";

const Home: FC = async () => {
  __cg("test", envApp.ENV);

  return <WakeUp />;
};

export default Home;
