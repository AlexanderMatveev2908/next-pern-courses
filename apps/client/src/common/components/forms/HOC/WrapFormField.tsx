/** @jsxImportSource @emotion/react */
"use client";

import { FieldArrType, FormFieldType } from "@/common/types/uiFactory";
import { FieldErrors, FieldValues, Path } from "react-hook-form";
import ErrFormField from "../errors/ErrFormField";
import Tooltip from "../../elements/Tooltip";
import { css } from "@emotion/react";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el?: FormFieldType<T> | FieldArrType<T, K>;
  showLabel: boolean;
  errors: FieldErrors<T>;
  children: React.ReactNode;
  index?: number;
  manualErr?: string;
  notice?: string;
};

const WrapFormField = <T extends FieldValues, K extends Path<T>>({
  el,
  errors,
  showLabel,
  children,
  index,
  manualErr,
  notice,
}: PropsType<T, K>) => {
  return (
    <label
      htmlFor={el?.name ?? ""}
      className="w-full max-w-full grid grid-cols-1 gap-4 h-fit relative"
    >
      <div className="w-full flex items-center gap-5">
        {showLabel && (
          <span className="txt__lg text-neutral-200">{el?.label}</span>
        )}

        {notice && (
          <Tooltip
            {...{
              isHover: true,
              txt: notice,
              $customCSS: {
                css: css`
                  right: 0%;
                  top: 15%;
                `,
              },
            }}
          />
        )}
      </div>

      <div className="w-full flex max-w-full relative">
        {children}

        <ErrFormField {...{ el, errors, index, manualErr }} />
      </div>
    </label>
  );
};

export default WrapFormField;
