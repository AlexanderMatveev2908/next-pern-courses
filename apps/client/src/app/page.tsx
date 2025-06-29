import type { FC } from "react";
import { sum } from "@shared/lib/index.js";

const Home: FC = () => {
  sum();

  return (
    <div className="text-green-600 text-5xl">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, optio sunt
      placeat praesentium excepturi voluptatum laborum nulla animi, provident
      enim sto veritatis doloribus eius quibusdam, sed sint molestias nam.
    </div>
  );
};

export default Home;
