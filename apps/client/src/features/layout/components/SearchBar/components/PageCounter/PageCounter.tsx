/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { useCallback, useEffect, useState } from "react";
import WrapSearchBarBtn from "../HOC/WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { css } from "@emotion/react";
import RowBtnCounter from "./components/RowBtnCounter";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import { getLimitPage, grabNumBlockBtns } from "../../lib/style";
import { __cg } from "@shared/first/lib/logger.js";
import {
  PaginatedResAPI,
  ReqSearchAPI,
  TriggerTypeRTK,
} from "@/common/types/api";
import { useFactoryAPI } from "../../hooks/useFactoryAPI";
import { FieldValues } from "react-hook-form";

type PropsType<
  T extends PaginatedResAPI<any>,
  K extends ReqSearchAPI,
  U extends FieldValues,
> = {
  totPages?: number;
  nHits?: number;
  triggerRTK: TriggerTypeRTK<T, K>;
  triggerRef: () => void;
  valsRHF: U;
};

const PageCounter = <
  T extends PaginatedResAPI<any>,
  K extends ReqSearchAPI,
  U extends FieldValues,
>({
  nHits = 0,
  totPages = 0,
  triggerRTK,
  triggerRef,
  valsRHF,
}: PropsType<T, K, U>) => {
  const [numBtnsPerBlock, setNumBtnsPerBlock] = useState(grabNumBlockBtns());

  const {
    updateNoDebounce,
    pagination: { limit, page, block },
  } = useSearchCtxConsumer();

  const { searchAPI } = useFactoryAPI({
    triggerRTK,
    triggerRef,
    updateNoDebounce,
  });
  const searchApiForChildrenHOF = useCallback(
    (page: number) => {
      searchAPI(valsRHF, {
        page,
        limit: getLimitPage(),
      });
    },
    [searchAPI, valsRHF],
  );

  useEffect(() => {
    const listen = () => {
      const newLimit = getLimitPage();
      if (newLimit === limit) return;

      __cg(
        "trigger limit update",
        ["old limit", newLimit],
        ["new limit", limit],
      );

      searchAPI(valsRHF, {
        page: 0,
        limit: newLimit,
      });
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [limit, searchAPI, valsRHF]);

  useEffect(() => {
    const listen = () => {
      setNumBtnsPerBlock((prev) => {
        const newVal = grabNumBlockBtns();
        return newVal === prev ? prev : newVal;
      });
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  // __cg("pagination", ["blocks", numBtnsPerBlock]);

  const { setPagination } = useSearchCtxConsumer();
  const handleBlock = (operator: "+" | "-") => {
    setPagination({
      el: "block",
      val: block + (operator === "+" ? 1 : -1),
    });
  };

  const maxBlocksPossible = Math.ceil(totPages / numBtnsPerBlock);
  console.log(totPages);

  return !totPages ? null : (
    <div className="w-full grid grid-cols-[80px_1fr_80px] ic gap-10 pt-[100px]">
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.NEUTRAL,
          Svg: ArrowBigLeftDash,
          isEnabled: !!block,
          handleClick: handleBlock.bind(null, "-"),
          labelConf: [],
          $SvgCustomCSS: {
            css: css`
              min-width: 35px;
              min-height: 35px;
            `,
          },
        }}
      />

      <RowBtnCounter
        {...{
          nHits,
          totPages,
          numBtnsPerBlock,
          limit,
          block,
          page,
          searchApiForChildrenHOF,
        }}
      />

      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.NEUTRAL,
          Svg: ArrowBigRightDash,
          labelConf: [],
          handleClick: handleBlock.bind(null, "+"),
          $SvgCustomCSS: {
            css: css`
              min-width: 35px;
              min-height: 35px;
            `,
          },
          isEnabled: block < maxBlocksPossible - 1,
        }}
      />
    </div>
  );
};

export default PageCounter;
