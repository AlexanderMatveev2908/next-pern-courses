/** @jsxImportSource @emotion/react */
"use client";

import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { FormFieldArrayType } from "@/common/types/uiFactory";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { ArrayPath, FieldValues, useFormContext } from "react-hook-form";

type PropsType<
  T extends FieldValues & {
    txtInputs: FormFieldArrayType[];
  },
  K extends ArrayPath<T>,
> = {
  txtInputs: T[K];
};

const PrimaryRow = <
  T extends FieldValues & {
    txtInputs: FormFieldArrayType[];
  },
  K extends ArrayPath<T>,
>({}: PropsType<T, K>) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<T>();
  // const { remove } = useFieldArray<T, ArrayPath<T>>({
  //   control,
  //   name: "txtInputs" as K,
  // });

  const fields: FormFieldArrayType[] = watch("txtInputs" as T[K]);

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
              {/* <WrapSearchBarBtn
                {...{
                  btnActType: BtnActType.ERROR,
                  Svg: FaTrashCan,
                  handleClick: () => remove(i),
                }}
              /> */}
            </div>
          ))}
    </div>
  );
};

export default PrimaryRow;
