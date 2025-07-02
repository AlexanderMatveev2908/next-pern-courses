/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";
import BtnShadow from "../../buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";

type PropsType = {
  isData: boolean;
  isFile: boolean;
  handleUpload: () => void;
  handleRemove: () => void;
};

const RowButtonsFile: FC<PropsType> = ({
  handleRemove,
  handleUpload,
  isData,
  isFile,
}) => {
  return (
    <div className="w-full max-w-[600px] flex items-center gap-6 sm:gap-10 mt-4">
      <div className="w-full max-w-[250px]">
        <BtnShadow
          {...{
            type: "button",
            label: !isData ? "Upload" : isFile ? `1 File` : `1 URL`,
            btnActType: BtnActType.info,
            isEnabled: true,
            handleClick: handleUpload,
          }}
        />
      </div>

      {isData && (
        <div className="w-full max-w-[275px]">
          <BtnShadow
            {...{
              type: "button",
              label: isFile ? "Remove File" : "Remove URL",
              btnActType: BtnActType.error,
              isEnabled: true,
              handleClick: handleRemove,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RowButtonsFile;
