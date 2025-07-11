/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

const WarnForm: FC = () => {
  return (
    <div className="w-full flex justify-end">
      <span className="txt__md text-gray-300">
        Fields marked with * are required
      </span>
    </div>
  );
};

export default WarnForm;
