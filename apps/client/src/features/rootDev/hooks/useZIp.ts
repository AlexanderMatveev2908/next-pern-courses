import { FieldValues, UseFormSetValue } from "react-hook-form";
import { proxySliceAPI } from "../slices/proxyAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";

type Params<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
};

export const useZip = <T extends FieldValues>({ setValue }: Params<T>) => {
  const res = proxySliceAPI.useGrabAssetsZipQuery({});

  useWrapQuery({
    ...res,
    showToast: true,
  });

  return {
    isLoadingProxy: res.isLoading,
  };
};
