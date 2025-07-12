/** @jsxImportSource @emotion/react */
"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BtnActType } from "@/common/types/uiFactory";
import { FaSort } from "react-icons/fa";
import WrapSearchBarBtn from "./HOC/WrapSearchBarBtn";
import { css } from "@emotion/react";
import { FieldValues, Path } from "react-hook-form";
import WrapBtnRow from "./HOC/WrapBtnRow";
import { useSearchCtxConsumer } from "../contexts/hooks/useSearchCtxConsumer";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  txtInputs: T[K];
};
const SecondaryRowBtns = <T extends FieldValues, K extends Path<T>>(
  {
    // txtInputs,
  }: PropsType<T, K>,
) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const { control, watch } = useFormContext<T>();
  // const { append } = useFieldArray<T, ArrayPath<T>>({
  //   control,
  //   name: "txtInputs" as K,
  // });
  // const fields: FormFieldArrayType[] = watch("txtInputs" as T[K]);

  // const fieldsToAdd: FormFieldArrayType[] = useMemo(
  //   () =>
  //     txtInputs.filter(
  //       (el: FormFieldArrayType) =>
  //         !(fields ?? []).some((f: FormFieldArrayType) => f.label === el.label),
  //     ),
  //   [fields, txtInputs],
  // );

  const { setBar } = useSearchCtxConsumer();

  return (
    <div className="w-full grid grid-cols-1 gap-6">
      {/* <div className="w-full grid grid-cols-1 lg:order-[1]">
        <div className="w-full max-w-[250px] justify-self-end">
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
      </div> */}

      <WrapBtnRow>
        <WrapSearchBarBtn
          {...{
            btnActType: BtnActType.INFO,
            Svg: IoFilterSharp,
            $customCSS: {
              css: css`
                justify-self: center;
              `,
            },
            labelConf: [650, "filter"],
            handleClick: () =>
              setBar({
                el: "filterBar",
                val: true,
              }),
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
            labelConf: [650, "sort"],
            handleClick: () =>
              setBar({
                el: "sortBar",
                val: true,
              }),
          }}
        />
      </WrapBtnRow>
    </div>
  );
};

export default SecondaryRowBtns;
