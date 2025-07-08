/** @jsxImportSource @emotion/react */
"use client";

import { FieldCheckValType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { IconType } from "react-icons/lib";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  // ? radio form field has just a string real checkbox array of strings
  data?: PathValue<T, K>[];
  handleClick: () => void;
  el: FieldCheckValType<T, K> & {
    Svg?: IconType;
  };
};

const FormFieldBoxV2 = <T extends FieldValues, K extends Path<T>>({
  data,
  handleClick,
  el,
}: PropsType<T, K>) => {
  const isChecked =
    el?.type === "checkbox"
      ? (data ?? [])?.some((item) => item === el.val)
      : (data as PathValue<T, K>) === (el.val as string);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full rounded-2xl p-3 flex justify-center items-center max-w-[350px] h-fit gap-4"
      css={css`
        transition:
          transform ${isChecked ? 0.2 : 0.3}s ease-in-out,
          background ${isChecked ? 0.2 : 0.3}s ease-in-out;
        border: 2px solid var(--${isChecked ? "white__0" : "neutral__600"});
        background: var(--${isChecked ? "white__0" : "transparent"});
        transform: scale(${isChecked ? 0.85 : 1});
        cursor: pointer;
        color: var(--${isChecked ? "neutral__950" : "neutral__300"});

        &:hover {
          transform: scale(${isChecked ? 0.85 : 1.125});
        }
      `}
    >
      {el?.Svg ? <el.Svg className="w-[30px] h-[30px]" /> : null}

      <span className="txt__md" css={css``}>
        {el.label}
      </span>
    </button>
  );
};

export default FormFieldBoxV2;
