import LinkShadow from "@/common/components/buttons/LinkShadow";
import WakeUp from "@/features/wakeUp/components/WakeUp/WakeUp";
import type { FC } from "react";

const Home: FC = async () => {
  return (
    <>
      <WakeUp />

      <div className="w-full max-w-[350px] mt-8 mx-auto">
        <LinkShadow
          {...{
            label: "/courses/list",
            href: "/courses/list",
          }}
        />
      </div>
    </>
  );
};

export default Home;
