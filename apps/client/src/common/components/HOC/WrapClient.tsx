"use client";

import { useEffect, useState, type FC } from "react";
// ? I CAN NOT USE THE FANCIER SPINNER WITH FRAMER MOTION RESPONSIVE WITH DYNAMIC NUMBER OF DOTS BECAUSE BEING CLIENT COMPONENT IT WILL JUST WAIT HYDRATIONS NOT ABSOLVING HIS JOB TO DO STUFF
// import SpinnerPage from "../../../common/components/spinners/SpinnerPage/SpinnerPage";
import SpinnerNoHooks from "../spinners/SpinnerNoHooks/SpinnerNoHooks";

type PropsType = {
  children: React.ReactNode;
};

const WrapClient: FC<PropsType> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : <SpinnerNoHooks />;
};

export default WrapClient;
