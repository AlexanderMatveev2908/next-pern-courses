/* eslint-disable @typescript-eslint/no-explicit-any */
import { envApp } from "@/core/constants/env";
import { proxySliceAPI } from "../slices/proxyAPI";
import { useEffect } from "react";
import { isArrOK, isObjOK, isStr } from "@shared/first/lib/dataStructure.js";
import { b64ToFile } from "@/core/lib/etc";
import { useDispatch } from "react-redux";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { ApiEventType } from "@/common/types/api";

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

  const resBlob = proxySliceAPI.useGrabBlobAssetsQuery(undefined, {
    skip: !envApp.isDev,
  });
  const { data: blobData, isLoading: isBlobLoading } = resBlob;

  const resMd = proxySliceAPI.useGrabServerMdQuery(undefined, {
    skip: !envApp.isDev,
  });
  const { data: { markdown } = {}, isLoading: isLoadingMd } = resMd;

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

  useEffect(() => {
    if (!isStr(markdown)) return;

    setValue("markdown", markdown, {
      shouldValidate: true,
    });
  }, [markdown, setValue]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isStr(markdown) && isArrOK(b64Arg) && isObjOK(blobData))
      dispatch(
        toastSlice.actions.open({
          msg: "pre-filled form dev",
          type: ApiEventType.INFO,
        }),
      );
  }, [markdown, b64Arg, blobData, dispatch]);

  return {
    isLoadingProxy: isLoadingProxy || isBlobLoading || isLoadingMd,
  };
};
