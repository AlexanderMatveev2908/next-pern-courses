/** @jsxImportSource @emotion/react */
"use client";

import {
  useState,
  type FC,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { LucideProps } from "lucide-react";
import { IconType } from "react-icons/lib";
import { css } from "@emotion/react";
import { useHandleDrop } from "@/core/hooks/ui/useHaandleDrop";
import { FaChevronDown } from "react-icons/fa";

type PropsType = {
  el: {
    label: string;
    svg?:
      | ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
        >
      | IconType;
  };

  children: (arg: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
};

const DropMenu: FC<PropsType> = ({ el, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { containerRef, labelRef, minH } = useHandleDrop({
    setIsOpen,
  });
  return (
    <div
      className="w-full max-w-full relative"
      css={css`
        min-height: ${minH}px;
      `}
    >
      <div
        className="flex flex-col border-2 border-neutral-800 rounded-xl overflow-hidden absolute w-full"
        css={css`
          z-index: 100;
        `}
        ref={containerRef}
      >
        <div
          ref={labelRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between cursor-pointer py-2 pl-4 pr-4 border-b-2 text-neutral-200"
          css={css`
            transition: 0.3s;
            &:hover {
              text-shadow:
                0 0 5px var(--white__0),
                0 0 10px var(--white__0);
            }

            border-color: ${isOpen ? "var(--neutral__800)" : "transparent"};
          `}
        >
          <div className="w-full flex items-center gap-5">
            {el.svg && <el.svg className="w-[30px] h-[30px]" />}

            <span className="txt__lg">{el.label}</span>
          </div>

          <FaChevronDown className="w-[32.5px] h-[32.5px]" />
        </div>

        <ul
          className="w-full flex flex-col justify-start overflow-auto scroll__app"
          css={css`
            z-index: 100;
            transition: 0.3s;
            max-height: ${isOpen ? `200px` : "0"};
            padding: ${isOpen ? "5px 0px 5px 0px" : 0};
            pointer-events: ${isOpen ? "all" : "none"};
            background-color: var(--neutral__950);
          `}
        >
          {children({ isOpen, setIsOpen })}
        </ul>
      </div>
    </div>
  );
};

export default DropMenu;
