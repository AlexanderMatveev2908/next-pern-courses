import type { FC } from "react";
import { sum } from "@shared/first/lib/index.js";
import { __cg } from "@shared/first/lib/logger.js";
import WrapClient from "@/features/layout/shells/WrapClient";

const Home: FC = () => {
  sum();

  __cg("[DEBUG] Render Home", 1010);
  return (
    <WrapClient>
      <div className="text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis esse
        voluptatem at perferendis nobis earum sed consequatur reiciendis enim
        eos cumque, minus autem quisquam culpa corrupti praesentium corporis
        quas beatae!
      </div>
    </WrapClient>
  );
};

export default Home;
