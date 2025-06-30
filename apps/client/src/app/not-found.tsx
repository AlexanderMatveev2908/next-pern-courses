/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import Link from "next/link";
import type { FC } from "react";

const optCSS = css`
  width: 100%;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NotFound: FC = () => {
  return (
    <div className="w-full min-h-[40vh] flex flex-col items-center justify-end gap-14">
      <div css={optCSS} className="justify-start">
        <span className="text-center text-8xl sm:text-9xl font-bold grad__txt">
          404
        </span>
      </div>

      <div css={optCSS} className="gap-6">
        <span className="txt__lg text-gray-300 text-center">
          This is not the page your are looking for
        </span>

        <div className="w-full flex justify-center">
          <Link href="/" className="link">
            <span className="txt__xl text-[whitesmoke]">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
