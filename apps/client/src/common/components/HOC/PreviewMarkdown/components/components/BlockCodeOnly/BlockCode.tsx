/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { __cg } from "@shared/first/lib/logger";
import { FC, HTMLAttributes, useRef, useState } from "react";
import { LuCopyCheck, LuCopyPlus } from "react-icons/lu";
import { ExtraProps } from "react-markdown";
import { getTxt } from "./uiFactory";

type PropsType = HTMLAttributes<HTMLElement> & ExtraProps;

const BlockCode: FC<PropsType> = ({ children, className }: PropsType) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement | null>(null);

  const codeStr = getTxt(children).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeStr);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      __cg("Failed to copy", err);
    }
  };

  const Svg = isCopied ? LuCopyCheck : LuCopyPlus;

  return (
    <div
      className="w-fit min-w-full relative px-3 pb-4 pt-8"
      suppressHydrationWarning
    >
      {/* ? CONTENT IS CUT OUT, I DO NOT NEED SCROLL ON BIGGER PARENT TO SHOW MD FILES EASIER IN POPUP */}
      {/* <div
        aria-label="Text has been copied to your clipboard"
        className="absolute w-full max-w-fit py-2 px-6 border-neutral-600 border-2 bg-[#000] flex justify-center rounded-2xl z-60 top-2 right-2"
        css={css`
          pointer-events: none;
          transition: 0.3s ease-in-out;

          transform: ${isCopied ? "translateY(-100%)" : "translateY(0)"};
          opacity: ${isCopied ? 1 : 0};
        `}
      >
        <span className="text-center txt__sm text-neutral-200">
          Copied to clipboard
        </span>
      </div> */}

      <button
        type="button"
        aria-label="Copy the text to your clipboard"
        className="btn__app absolute top-1 right-1 enabled:cursor-pointer"
        style={
          {
            "--scale__up": 1.3,
          } as React.CSSProperties
        }
        onClick={handleCopy}
      >
        <Svg
          className="w-[25px] h-[25px]"
          css={css`
            transition: 0.2s;
            color: ${isCopied ? "var(--green__600)" : "var(--neutral__300)"};
          `}
        />
      </button>

      <code ref={codeRef} className={className}>
        {codeStr}
      </code>
    </div>
  );
};

export default BlockCode;
