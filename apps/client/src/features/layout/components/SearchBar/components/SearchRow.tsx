/** @jsxImportSource @emotion/react */
"use client";

import { FaTrashCan } from "react-icons/fa6";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { BtnActType, FormFieldArrayType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { FC } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import WrapSearchBarBtn from "./WrapSearchBarBtn";

type PropsType = {
  txtInputs: FormFieldArrayType[];
};

const SearchRow: FC<PropsType> = ({}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues & { txtInputs: FormFieldArrayType[] }>();
  const { fields, remove } = useFieldArray<
    { txtInputs: FormFieldArrayType[] },
    "txtInputs"
  >({
    control,
    name: "txtInputs",
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {!isArrOK(fields)
        ? null
        : fields.map((field, i) => (
            <div key={field.id} className="w-full flex gap-8 items-center">
              <FormFieldTxt
                {...{
                  control,
                  el: {
                    ...field,
                    name: `txtInputs.${i}.val`,
                  },
                  showLabel: false,
                  errors,
                  index: i,
                }}
              />
              <WrapSearchBarBtn
                {...{
                  btnActType: BtnActType.ERROR,
                  Svg: FaTrashCan,
                  handleClick: () => remove(i),
                }}
              />
            </div>
          ))}
    </div>
  );
};

export default SearchRow;
