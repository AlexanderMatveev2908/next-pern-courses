/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { FieldValues, Path, PathValue } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  val: PathValue<T, K>;
  isChecked: boolean;
  handleClick: () => void;
};

const FormFieldBox = <T extends FieldValues, K extends Path<T>>({
  isChecked,
  val,
}: PropsType<T, K>) => {
  return (
    <div
      className="w-full rounded-2xl p-3 flex justify-center items-center max-w-[350px] h-fit"
      css={css`
        border: 2px solid var(--${isChecked ? "white__0" : "neutral__600"});
        background: var(--${isChecked ? "white__0" : "transparent"});
      `}
    >
      <span
        className="txt__md"
        css={css`
          color: var(--${isChecked ? "neutral__950" : "neutral__300"});
        `}
      >
        {val}
      </span>
    </div>
  );
};

export default FormFieldBox;
