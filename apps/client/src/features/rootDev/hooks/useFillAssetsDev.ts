/* eslint-disable @typescript-eslint/no-explicit-any */
import { envApp } from "@/core/constants/env";
import { proxySliceAPI } from "../slices/proxyAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useEffect } from "react";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { b64ToFile } from "@/core/lib/etc";

type Params = {
  setValue: any;
};

export const useFillAssetsDev = ({ setValue }: Params) => {
  const resProxy = proxySliceAPI.useGrabServerAssetsQuery(
    {},
    {
      skip: !envApp.isDev,
    },
  );
  const { data: dataAssets, isLoading: isLoadingProxy } = resProxy;
  const { b64Arg } = dataAssets ?? [];
  useWrapQuery({
    ...resProxy,
    showToast: envApp.isDev,
  });

  useEffect(() => {
    if (!isArrOK(b64Arg)) return;

    const handleAssets = async () => {
      const argFiles: File[] = [];

      for (const b of b64Arg) {
        const f = await b64ToFile(b);

        argFiles.push(f);
      }

      setValue("images", argFiles, {
        shouldValidate: true,
      });
    };

    handleAssets();
  }, [b64Arg, setValue]);

  return {
    isLoadingProxy,
  };
};
