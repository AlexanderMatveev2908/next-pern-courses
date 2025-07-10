/** @jsxImportSource @emotion/react */
"use client";

import { FieldMiniCheckType } from "@/common/types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import Anchor from "../etc/Anchor";
import ErrFormField from "../errors/ErrFormField";
import { motion } from "framer-motion";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  el: FieldMiniCheckType<T, K>;
  showLabel?: boolean;
  cb?: (val: T[K]) => void;
};

const FormFiledMiniCheck = <T extends FieldValues, K extends Path<T>>({
  showLabel = true,
  el,
  cb,
}: PropsType<T, K>) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<T>();

  const handleChange = () => {
    const existing = getValues(el.name);

    setValue(el.name, !existing as PathValue<T, T[K]>, {
      shouldValidate: true,
    });

    cb?.(!existing as PathValue<T, T[K]>);
  };

  return (
    <div className="w-full max-w-fit grid grid-cols-1 gap-4">
      {showLabel && (
        <span className="txt__lg text-neutral-200">{el.label}</span>
      )}

      <div className="w-full max-w-fit relative flex justify-start items-center gap-8">
        <Anchor
          {...{
            name: el.name,
            register,
          }}
        />

        <ErrFormField
          {...{
            el,
            errors,
          }}
        />

        <label
          htmlFor={el.name}
          className="w-[40px] h-[40px] relative"
          onClick={handleChange}
        >
          <motion.div className=" border-[3px] absolute rounded-xl inset-0 border-neutral-600"></motion.div>
        </label>

        <span className="txt__md text-neutral-300">{el.txt}</span>
      </div>
    </div>
  );
};

export default FormFiledMiniCheck;
