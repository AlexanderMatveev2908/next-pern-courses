/** @jsxImportSource @emotion/react */
"use client";

import { FieldMiniCheckType } from "@/common/types/uiFactory";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { easeInOut, motion } from "framer-motion";
import ErrFormField from "../../errors/ErrFormField";
import Anchor from "../../etc/Anchor";

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
    watch,
  } = useFormContext<T>();

  const isChecked = watch(el.name);

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
          className="w-[40px] h-[40px] relative cursor-pointer"
          onClick={handleChange}
        >
          <motion.div
            key={isChecked}
            initial={{
              scaleX: 1,
              scaleY: 1,
            }}
            transition={{
              duration: 0.75,
              ease: easeInOut,
            }}
            animate={{
              scaleX: [0.6, 1.4, 0.8, 0.9, 1],
              scaleY: [1.4, 0.6, 1.2, 1.1, 1],
            }}
            className=" border-[3px] absolute rounded-xl inset-0 border-neutral-600"
          ></motion.div>

          <motion.div
            className="absolute -top-[10px] -left-[5px] w-full h-[70%] border-[5px] border-green-600 border-t-transparent border-l-transparent"
            initial={{
              scale: 0,
              rotate: 22.5,
            }}
            transition={{
              duration: 0.2,
              delay: 0.1,
              ease: easeInOut,
            }}
            animate={{
              scale: isChecked ? [0, 1.4, 1] : 0,
              rotate: isChecked ? [22.5, 45] : 0,
            }}
          ></motion.div>
        </label>

        <span className="txt__md text-neutral-300">{el.txt}</span>
      </div>
    </div>
  );
};

export default FormFiledMiniCheck;
