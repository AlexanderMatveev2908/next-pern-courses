/** @jsxImportSource @emotion/react */
"use client";

import { useMemo, type FC } from "react";
import { v4 } from "uuid";
import { css } from "@emotion/react";

type PropsType = {
  totPages: number;
  numBtnsPerBlock: number;
  block: number;
  limit: number;
  page: number;

  searchApiForChildrenHOF: (page: number) => void;
};

const RowBtnCounter: FC<PropsType> = ({
  totPages,
  numBtnsPerBlock,
  block,
  page,
  searchApiForChildrenHOF,
}) => {
  const currBlockNumeratedUserPages = useMemo(() => {
    const start = block * numBtnsPerBlock;
    const end = Math.min((block + 1) * numBtnsPerBlock, totPages);

    return Array.from({ length: end - start }, (_, i) => ({
      val: i + start,
      id: v4(),
    }));
  }, [block, numBtnsPerBlock, totPages]);

  return (
    <div
      className="w-full flex items-center gap-5"
      css={css`
        justify-content: ${numBtnsPerBlock === 1 ? "center" : "space-around"};
      `}
    >
      {currBlockNumeratedUserPages.map((el) => (
        <button
          key={el.id}
          onClick={searchApiForChildrenHOF.bind(null, el.val)}
          className="w-[60px] h-[60px] rounded-2xl"
          css={css`
            cursor: pointer;
            transition: 0.3s;
            border: 3px solid var(--neutral__800);
            color: var(--${page === el.val ? "neutral__950" : "white__0"});
            background: var(--${page === el.val ? "white__0" : "transparent"});
            scale: ${page === el.val ? 0.8 : 1};
            &:hover {
              transform: scale(${page === el.val ? 1 : 1.15});
            }
            &:active {
              transition: 0.1s;
              scale: 0.8;
            }
          `}
        >
          <span className="txt__lg">{el.val + 1} </span>
        </button>
      ))}
    </div>
  );
};

export default RowBtnCounter;
