/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useEffect, useRef, useState, type FC } from "react";

type PropsType = {
  description?: string | null;
};

const ClickTxtLonger: FC<PropsType> = ({ description }) => {
  const [descH, setDescH] = useState(200);
  const txtRef = useRef<HTMLDivElement | null>(null);
  const [isLonger, setIsLonger] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const el = txtRef.current;
    if (!el || !description) return;

    el.innerText = description;

    setIsLonger(el.scrollHeight > el.clientHeight);
  }, [description]);

  return (
    <div className="w-full grid grid-cols-1 gap-0">
      <div
        className="w-full flex overflow-y-hidden py-1"
        css={css`
          max-height: ${descH}px;
        `}
      >
        <span ref={txtRef} className="txt__md text-neutral-400">
          {description ?? "N/A"}
        </span>
      </div>

      {isLonger && (
        <button
          onClick={() => {
            setDescH(expand ? 200 : Infinity);
            setExpand((prev) => !prev);
          }}
          className="justify-self-end pr-3 -mt-1 cursor-pointer"
        >
          <span className="txt__lg text-neutral-200">
            {expand ? "Less" : "More"}
          </span>
        </button>
      )}
    </div>
  );
};

export default ClickTxtLonger;
