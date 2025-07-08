/** @jsxImportSource @emotion/react */
"use client";

import { SearchSortType } from "../../../../types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { genDefSortFields } from "../../../../uifactory/style";
import FormFieldBoxV2 from "@/common/components/forms/inputs/FormFieldBoxV2";
import { useMemo } from "react";
import { isStr } from "@shared/first/lib/dataStructure.js";
import { css } from "@emotion/react";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  sorter: SearchSortType<T, K>;
};

const RowSort = <T extends FieldValues, K extends Path<T>>({
  sorter,
}: PropsType<T, K>) => {
  const { watch, setValue } = useFormContext<T>();

  const data = watch(sorter.name);
  const handleChange = (val: "ASC" | "DESC") => {
    setValue(
      sorter.name,
      (!isStr(data) ? val : data === val ? "" : val) as PathValue<T, T[K]>,
      {
        shouldValidate: true,
      },
    );
  };

  const arg = useMemo(() => genDefSortFields(sorter.name), [sorter.name]);

  return (
    <div className="w-full grid grid-cols-1 gap-6">
      <span className="txt__lg justify-self-center text-neutral-200">
        {sorter.label}
      </span>

      <div
        className="w-full grid  gap-10 justify-items-center"
        css={css`
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        `}
      >
        {arg.map((el) => (
          <div key={el.id} className="w-full max-w-[200px]">
            <FormFieldBoxV2
              {...{
                el,
                data,
                handleClick: handleChange.bind(null, el.val as "ASC" | "DESC"),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowSort;
