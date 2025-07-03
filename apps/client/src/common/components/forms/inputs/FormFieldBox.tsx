/** @jsxImportSource @emotion/react */
"use client";

import { FieldCheckType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { FieldValues, Path, PathValue } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  valArg: [string, string];
  data?: PathValue<T, K>[] | PathValue<T, K>;
  handleClick: () => void;
  el: FieldCheckType<T>;
};

const FormFieldBox = <T extends FieldValues, K extends Path<T>>({
  data,
  valArg,
  handleClick,
  el,
}: PropsType<T, K>) => {
  const isChecked =
    el.type === "radio"
      ? data === valArg[0]
      : (data ?? []).some((item) => item === valArg[0]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full rounded-2xl p-3 flex justify-center items-center max-w-[350px] h-fit"
      css={css`
        transition:
          transform ${isChecked ? 0.2 : 0.3}s ease-in-out,
          background ${isChecked ? 0.2 : 0.3}s ease-in-out;
        border: 2px solid var(--${isChecked ? "white__0" : "neutral__600"});
        background: var(--${isChecked ? "white__0" : "transparent"});
        transform: scale(${isChecked ? 0.85 : 1});
        cursor: pointer;

        &:hover {
          transform: scale(${isChecked ? 0.85 : 1.125});
        }
      `}
    >
      <span
        className="txt__md"
        css={css`
          color: var(--${isChecked ? "neutral__950" : "neutral__300"});
        `}
      >
        {valArg[1]}
      </span>
    </button>
  );
};

export default FormFieldBox;
