import { api } from "@/core/store/api";
import { store } from "@/core/store/store";
import WakeUpSSR from "@/features/wakeUp/components/WakeUpSSR";
import { wakeUpSliceAPI } from "@/features/wakeUp/slices";
import type { FC } from "react";

export const getServerSideProps = async () => {
  await store.dispatch(
    wakeUpSliceAPI.util.prefetch("wakeUpFly", undefined, {
      force: true,
    }),
  );

  return {
    props: {
      initRtkState: store.getState(),
    },
  };
};

const Home: FC = async () => {
  return <WakeUpSSR />;
};

export default Home;
