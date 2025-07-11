/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef, useState, type FC } from "react";
import BtnShadow from "../../buttons/BtnShadow/BtnShadow";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";

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
  const contRef = useRef<HTMLDivElement>(null);
  const [isWrap, setIsWrap] = useState(false);

  useEffect(() => {
    const el = contRef.current;
    if (!el) return;

    const cb = () => {
      const childTops = Array.from(el.children).map(
        (child) => (child as HTMLElement).offsetTop,
      );

      const unique = new Set(childTops);
      setIsWrap(unique.size > 1);
    };

    const obs = new ResizeObserver(cb);
    obs.observe(el);

    window.addEventListener("resize", cb);

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", cb);
    };
  }, []);

  return (
    <div
      ref={contRef}
      className="w-full max-w-[600px] items-center gap-6 sm:gap-10 mt-4"
      css={css`
        display: grid;
        place-content: ${isWrap ? "center" : "start"};
        grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
      `}
    >
      <div className="w-full max-w-[250px]">
        <BtnShadow
          {...{
            type: "button",
            label: !isData ? "Upload" : isFile ? `1 File` : `1 URL`,
            btnActType: BtnActType.SUCCESS,
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
              btnActType: BtnActType.ERROR,
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
