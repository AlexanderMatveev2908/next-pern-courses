/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useState, type FC } from "react";
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
  const [maxBlocks, setMaxBlocks] = useState(grabNumBlockBtns());

  const {
    updateNoDebounce,
    pagination: { limit },
  } = useSearchCtxConsumer();

  const { searchAPI } = useFactoryAPI({
    triggerRTK,
    triggerRef,
    updateNoDebounce,
  });

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
      setMaxBlocks((prev) => {
        const newVal = grabNumBlockBtns();
        return newVal === prev ? prev : newVal;
      });
    };

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, []);

  // __cg("pagination", ["blocks", maxBlocks]);

  const { setPagination } = useSearchCtxConsumer();

  return !totPages ? null : (
    <div className="w-full grid grid-cols-[80px_1fr_80px] ic gap-10 pt-[100px]">
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.NEUTRAL,
          Svg: ArrowBigLeftDash,
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
        }}
      />

      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.NEUTRAL,
          Svg: ArrowBigRightDash,
          labelConf: [],
          $SvgCustomCSS: {
            css: css`
              min-width: 35px;
              min-height: 35px;
            `,
          },
        }}
      />
    </div>
  );
};

export default PageCounter;
