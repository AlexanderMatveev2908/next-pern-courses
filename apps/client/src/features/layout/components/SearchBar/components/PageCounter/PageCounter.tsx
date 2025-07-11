/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import WrapSearchBarBtn from "../HOC/WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import RowBtnCounter from "./components/RowBtnCounter";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";
import { getLimitPage, grabNumBlockBtns } from "../../lib/style";
import {
  PaginatedResAPI,
  ReqSearchAPI,
  TriggerTypeRTK,
} from "@/common/types/api";
import { useFactoryAPI } from "../../hooks/useFactoryAPI";
import { FieldValues } from "react-hook-form";
import { v4 } from "uuid";
import Shim from "@/common/components/elements/Shim";
import { css } from "@emotion/react";

type PropsType<
  T extends PaginatedResAPI<any>,
  K extends ReqSearchAPI,
  U extends FieldValues,
> = {
  totPages?: number;
  triggerRTK: TriggerTypeRTK<T, K>;
  triggerRef: () => void;
  valsRHF: U;
  isHydrated: boolean;
};

const PageCounter = <
  T extends PaginatedResAPI<any>,
  K extends ReqSearchAPI,
  U extends FieldValues,
>({
  totPages = 0,
  triggerRTK,
  triggerRef,
  valsRHF,
  isHydrated,
}: PropsType<T, K, U>) => {
  const [numBtnsPerBlock, setNumBtnsPerBlock] = useState(grabNumBlockBtns());

  const {
    updateNoDebounce,
    pagination: { limit, page, block },
    setPagination,
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

  const maxBlocksPossible = useMemo(
    () => Math.ceil(totPages / numBtnsPerBlock),
    [totPages, numBtnsPerBlock],
  );

  useEffect(() => {
    const listen = () => {
      const newLimit = getLimitPage();
      if (newLimit === limit) return;

      // __cg(
      //   "trigger limit update",
      //   ["old limit", newLimit],
      //   ["new limit", limit],
      // );

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

  useEffect(() => {
    const listen = () => {
      if (!totPages) return;

      const lastBlockIdx = maxBlocksPossible - 1;
      const lastPageIdx = totPages - 1;

      if (block > lastBlockIdx)
        setPagination({
          el: "block",
          val: lastBlockIdx,
        });

      if (page > lastPageIdx)
        searchAPI(valsRHF, {
          page: lastPageIdx,
        });
    };

    listen();

    window.addEventListener("resize", listen);

    return () => {
      window.removeEventListener("resize", listen);
    };
  }, [
    block,
    maxBlocksPossible,
    numBtnsPerBlock,
    page,
    searchAPI,
    valsRHF,
    setPagination,
    totPages,
  ]);
  // __cg("pagination", ["blocks", numBtnsPerBlock]);

  const handleBlock = (operator: "+" | "-") => {
    setPagination({
      el: "block",
      val: block + (operator === "+" ? 1 : -1),
    });
  };

  // __cg("pagination", ["block", block], ["page", page], ["limit", limit]);

  return !isHydrated ? (
    <div className="w-full flex justify-around items-center">
      {Array.from({ length: 4 }, () => v4()).map((id) => (
        <Shim
          key={id}
          {...{
            $CSS: {
              css: css`
                width: 40px;
                height: 40px;
              `,
            },
          }}
        />
      ))}
    </div>
  ) : !totPages ? null : (
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
