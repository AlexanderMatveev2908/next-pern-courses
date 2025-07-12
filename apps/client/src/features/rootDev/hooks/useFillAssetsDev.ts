/* eslint-disable @typescript-eslint/no-explicit-any */
import { envApp } from "@/core/constants/env";
import { proxySliceAPI } from "../slices/proxyAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useEffect } from "react";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
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

  const resBlob = proxySliceAPI.useGrabBlobAssetsQuery(
    {},
    {
      skip: !envApp.isDev,
    },
  );
  const { data: blobData, isLoading: isBlobLoading } = resBlob;
  useWrapQuery({ ...resBlob });

  useEffect(() => {
    const handleAssets = async () => {
      if (!isArrOK(b64Arg)) return;

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
  }, [b64Arg, setValue, blobData]);

  useEffect(() => {
    const handleBlob = async () => {
      if (!isObjOK(blobData)) return;

      const { blob } = blobData;
      const file = new File([blob], "video.mp4", { type: "video/mp4" });

      setValue("video", file, {
        shouldValidate: true,
      });
    };

    handleBlob();
  }, [blobData, setValue]);

  return {
    isLoadingProxy: isLoadingProxy || isBlobLoading,
  };
};
