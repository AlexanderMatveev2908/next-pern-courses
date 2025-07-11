/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { isArrOK, isStr } from "@shared/first/lib/dataStructure";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import ImagePreview from "./components/ImagePreview";
import { FormFieldType } from "@/common/types/uiFactory";
import { useMemo } from "react";

type PropsType<T extends FieldValues> = {
  images?: File[] | string[];
  setValue: UseFormSetValue<T>;
  el: FormFieldType<T>;
};

const PreviewImagesList = <T extends FieldValues>({
  images,
  setValue,
  el,
}: PropsType<T>) => {
  const isData = useMemo(
    () =>
      isArrOK(
        images as unknown as (string | File)[],
        (val) => isStr(val as string) || val instanceof File,
      ),
    [images],
  );

  const handleDelImage = (img: File | string) => {
    const fallBack = isData ? images : [];

    const updated = fallBack!.filter((el: File | string) => el !== img);
    setValue(el.name, updated as T[typeof el.name], {
      shouldValidate: true,
    });
  };

  return (
    <div
      className="w-full max-w-fit rounded-xl overflow-x-auto flex gap-8 snap-x snap-mandatory"
      css={css`
        margin-top: ${isData ? "1rem" : "0px"};
        padding: ${isData ? "30px" : "0px"};
        border: 2px solid ${isData ? "var(--neutral__800)" : "trasnparent"};
      `}
    >
      {isData &&
        images!.map((el, i) => (
          <ImagePreview
            key={i}
            {...{ el, setValue, handleClick: handleDelImage.bind(null, el) }}
          />
        ))}
    </div>
  );
};

export default PreviewImagesList;
