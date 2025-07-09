/** @jsxImportSource @emotion/react */
"use client";

import WrapBtnRow from "./WrapBtnRow";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { BtnActType } from "@/common/types/uiFactory";
import { FaSearch } from "react-icons/fa";
import { css } from "@emotion/react";
import { Eraser } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useCallback } from "react";
import { useSearchCtxConsumer } from "../../contexts/hooks/useSearchCtxConsumer";

type PropsType<T extends FieldValues> = {
  txtInputs: T["txtInputs"];
  triggerResetAPI: () => void;
};

const WrapImpBtns = <T extends FieldValues>({
  triggerResetAPI,
}: PropsType<T>) => {
  const handleReset = useCallback(() => {
    {
      triggerResetAPI();
    }
  }, [triggerResetAPI]);

  const {
    isSearchPending: { clear, submit },
  } = useSearchCtxConsumer();

  return (
    <WrapBtnRow>
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.SUCCESS,
          Svg: FaSearch,
          $customCSS: {
            css: css`
              justify-self: center;
            `,
          },
          labelConf: [650, "search"],
          type: "submit",
          isLoading: submit,
        }}
      />
      <WrapSearchBarBtn
        {...{
          btnActType: BtnActType.ERROR,
          Svg: Eraser,
          $customCSS: {
            css: css`
              justify-self: center;
            `,
          },
          labelConf: [650, "reset"],
          handleClick: handleReset,
          isLoading: clear,
        }}
      />
    </WrapBtnRow>
  );
};

export default WrapImpBtns;
