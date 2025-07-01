/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useState, type FC } from "react";
import InnerShadow from "./components/InnerShadow/InnerShadow";

type PropsType = {
  type: "button" | "submit";
  handleClick?: () => void;
  label: string;
  isEnabled: boolean;
};

const BtnShim: FC<PropsType> = ({ type, handleClick, label, isEnabled }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-full h-full"
      css={css`
        cursor: ${isEnabled ? "pointer" : "not-allowed"};
        opacity: ${isEnabled ? 1 : 0.5};
      `}
    >
      <div
        css={css`
          padding: 7.5px 50px;
          border: 2px solid var(--neutral__300);
          border-radius: 15px;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-height: 100%;
          pointer-events: none;

          box-shadow: ${isHover && isEnabled
            ? "0 0 10px var(--white__0), 0 0 20px var(--white__0), 0 0 30px var(--white__0)"
            : "none"};
        `}
      >
        <InnerShadow {...{ isHover, isEnabled }} />

        <span className="txt__lg text-neutral-200 relative z-60">{label}</span>
      </div>
    </button>
  );
};

export default BtnShim;
