/** @jsxImportSource @emotion/react */
"use client";

import { FieldArrType, FieldMiniCheckType } from "@/common/types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import ErrFormField from "../../errors/ErrFormField";
import Anchor from "../../etc/Anchor";
import { isStr } from "@shared/first/lib/dataStructure.js";
import MiniCheckBox from "./components/MiniCheckBox";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FieldMiniCheckType<T, K> | FieldArrType<T, K>;
  showLabel?: boolean;
  cb?: (val: T[K]) => void;
  grabbedErr?: string;
  txt?: string;
};

const FormFiledMiniCheck = <T extends FieldValues, K extends Path<T>>({
  showLabel = true,
  el,
  cb,
  txt,
  grabbedErr,
}: PropsType<T, K>) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<T>();

  const isChecked = watch(el.name as Path<T>);

  const handleChange = () => {
    const existing = getValues(el.name as Path<T>);

    setValue(el.name as Path<T>, !existing as PathValue<T, T[K]>, {
      shouldValidate: true,
    });

    cb?.(!existing as PathValue<T, T[K]>);
  };

  return (
    <div className="w-full max-w-fit grid grid-cols-1 gap-4 h-fit ">
      {showLabel && (
        <span className="txt__lg text-neutral-200">{el.label}</span>
      )}

      <div className="w-full max-w-fit relative flex justify-start items-center gap-8 ">
        <Anchor
          {...{
            name: el.name as Path<T>,
            register,
          }}
        />

        <ErrFormField
          {...{
            el,
            errors,
            grabbedErr,
          }}
        />

        <label
          htmlFor={el.name}
          className="w-[40px] h-[40px] relative cursor-pointer"
          onClick={handleChange}
        >
          <MiniCheckBox
            {...{
              isChecked,
            }}
          />
        </label>

        {isStr(txt) && <span className="txt__md text-neutral-300">{txt}</span>}
      </div>
    </div>
  );
};

export default FormFiledMiniCheck;
