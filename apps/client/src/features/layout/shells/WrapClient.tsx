"use client";

import { useEffect, useState, type FC } from "react";
import Spinner from "../../../common/components/spinners/SpinnerPage/SpinnerPage";

type PropsType = {
  children: React.ReactNode;
};

const WrapClient: FC<PropsType> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : <Spinner />;
};

export default WrapClient;
