/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { FieldValues, Path, PathValue } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  val: PathValue<T, K>;
  data?: PathValue<T, K>[] | PathValue<T, K>;
  handleClick: () => void;
  typeBox: "checkbox" | "radio";
};

const FormFieldBox = <T extends FieldValues, K extends Path<T>>({
  data,
  val,
  handleClick,
  typeBox,
}: PropsType<T, K>) => {
  const isChecked =
    typeBox === "radio"
      ? data === val
      : (data ?? []).some((item) => item === val);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn__app w-full rounded-2xl p-3 flex justify-center items-center max-w-[350px] h-fit"
      css={css`
        transition: 10s ease-in-out;
        border: 2px solid var(--${isChecked ? "white__0" : "neutral__600"});
        background: var(--${isChecked ? "white__0" : "transparent"});
      `}
      style={
        {
          "--scale__up": 1.125,
        } as React.CSSProperties
      }
    >
      <span
        className="txt__md"
        css={css`
          color: var(--${isChecked ? "neutral__950" : "neutral__300"});
        `}
      >
        {val}
      </span>
    </button>
  );
};

export default FormFieldBox;
