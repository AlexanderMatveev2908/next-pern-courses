/** @jsxImportSource @emotion/react */
"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BtnActType, FormFieldArrayType } from "@/common/types/uiFactory";
import { useMemo, useState } from "react";
import { FaSort } from "react-icons/fa";
import WrapSearchBarBtn from "./WrapSearchBarBtn";
import { css } from "@emotion/react";
import { useListenCondLabel } from "../hooks/useListenCondLabel";
import DropMenu from "@/common/components/dropMenu/DropMenu";
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { v4 } from "uuid";

type PropsType<
  T extends FieldValues & {
    txtInputs: FormFieldArrayType[];
  },
  K extends ArrayPath<T>,
> = {
  txtInputs: T[K];
};
const SearchRowBtns = <
  T extends FieldValues & { txtInputs: FormFieldArrayType[] },
  K extends ArrayPath<T>,
>({
  txtInputs,
}: PropsType<T, K>) => {
  const { showLabel } = useListenCondLabel({ width: 650 });
  const [isOpen, setIsOpen] = useState(false);

  const { control, watch } = useFormContext<T>();
  const { append } = useFieldArray<T, ArrayPath<T>>({
    control,
    name: "txtInputs" as K,
  });
  const fields: FormFieldArrayType[] = watch("txtInputs" as T[K]);

  const fieldsToAdd: FormFieldArrayType[] = useMemo(
    () =>
      txtInputs.filter(
        (el: FormFieldArrayType) =>
          !(fields ?? []).some((f: FormFieldArrayType) => f.label === el.label),
      ),
    [fields, txtInputs],
  );

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div className="w-full grid grid-cols-1">
        <div className="min-w-[300px] justify-self-center">
          <DropMenu
            {...{
              el: {
                label: "Search By",
              },
              isOpen,
              setIsOpen,
            }}
          >
            {fieldsToAdd.map((el: FormFieldArrayType) => (
              <li
                onClick={() => {
                  append({
                    ...el,
                    id: v4(),
                  } as T[K]);
                  setIsOpen(false);
                }}
                key={el.id}
                className="w-full flex py-2 px-3 rounded-xl transition-all duration-300 hover:text-neutral-950 hover:bg-[whitesmoke] cursor-pointer"
              >
                <span className="txt__md">{el.label}</span>
              </li>
            ))}
          </DropMenu>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-items-center gap-6">
        <WrapSearchBarBtn
          {...{
            btnActType: BtnActType.INFO,
            Svg: IoFilterSharp,
            $customCSS: {
              css: css`
                justify-self: center;
              `,
            },
            label: showLabel ? "Filter" : null,
          }}
        />
        <WrapSearchBarBtn
          {...{
            btnActType: BtnActType.INFO,
            Svg: FaSort,
            $customCSS: {
              css: css`
                justify-self: center;
              `,
            },
            label: showLabel ? "Sort" : null,
          }}
        />
      </div>
    </div>
  );
};

export default SearchRowBtns;
