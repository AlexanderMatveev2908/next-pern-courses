import WrapClient from "@/common/components/HOC/WrapClient";
import WakeUp from "@/features/wakeUp/components/WakeUp";
import type { FC } from "react";

const Home: FC = () => {
  return (
    <WrapClient>
      <WakeUp />
    </WrapClient>
  );
};

export default Home;
