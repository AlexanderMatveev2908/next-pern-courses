import { AppStateTypeSSR } from "@/core/store/store";
import { useSelector } from "react-redux";

type Params<T> = {
  selector: (state: AppStateTypeSSR) => { data?: T };
};

export const useCachedData = <T>({ selector }: Params<T>) => {
  const cachedData = useSelector(
    (state: AppStateTypeSSR) => selector(state)?.data,
  );

  return {
    cachedData,
  };
};
