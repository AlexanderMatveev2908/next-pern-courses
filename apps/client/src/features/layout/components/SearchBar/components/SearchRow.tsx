/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { FormFieldArrayType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type PropsType = {
  txtInputs: FormFieldArrayType[];
};

const SearchRow: FC<PropsType> = ({ txtInputs }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "txtInputs",
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {!isArrOK(fields)
        ? null
        : fields.map((field, i) => (
            <div key={field.id} className="w-full flex gap-5 items-center">
              <FormFieldTxt
                {...({
                  control,
                  el: {
                    ...field,
                    name: `txtInputs.${i}.val`,
                  },
                  showLabel: false,
                  errors,
                  index: i,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)}
              />
            </div>
          ))}
    </div>
  );
};

export default SearchRow;
