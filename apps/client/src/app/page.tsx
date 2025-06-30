import type { FC } from "react";
import { sum } from "@shared/lib/index.js";
import WrapClient from "@/core/layout/shells/WrapClient";

const Home: FC = () => {
  sum();

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
