/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { proxySliceAPI } from "../slices/proxyAPI";
import { useWrapQuery } from "@/core/hooks/api/useWrapQuery";
import { useEffect } from "react";
import { envApp } from "@/core/constants/env";
import { isObjOK } from "@shared/first/lib/dataStructure.js";

type Params<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
};

export const useZip = <T extends FieldValues>({ setValue }: Params<T>) => {
  const res = proxySliceAPI.useGrabAssetsZipQuery(
    {},
    {
      skip: !envApp.isDev,
    },
  );
  const { data } = res;

  useWrapQuery({
    ...res,
    showToast: envApp.isDev,
  });

  useEffect(() => {
    if (!envApp.isDev || !isObjOK(data)) return;

    const images = Object.values(data).filter((f) =>
      ((f as any)?.name as string)?.startsWith("img"),
    ) as PathValue<T, Path<T>>;
    setValue("images" as Path<T>, images, { shouldValidate: true });

    const video = Object.values(data).find(
      (f) => (f as any)?.name === "eg.mp4",
    );
    setValue("video" as any, video as any, { shouldValidate: true });

    const md = Object.entries(data).filter(([k]) =>
      k.endsWith(".md"),
    )?.[0]?.[1];
    setValue("markdown" as any, md as any, {
      shouldValidate: true,
    });
  }, [data, setValue]);

  return {
    isLoadingProxy: res.isLoading,
  };
};
