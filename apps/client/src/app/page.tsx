import type { FC } from "react";
import { sum } from "@shared/first/lib/index.js";
import { __cg } from "@shared/first/lib/logger.js";

const Home: FC = () => {
  sum();

  __cg("shared cb", 1010);
  return (
    <div className="text-gray-300">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis esse
      voluptatem at perferendis nobis earum sed consequatur reiciendis enim eos
      cumque, minus autem quisquam culpa corrupti praesentium corporis quas
      beatae!
    </div>
  );
};

export default Home;
