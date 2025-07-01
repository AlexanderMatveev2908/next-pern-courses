/** @jsxImportSource @emotion/react */
"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type PropsType<T extends FieldValues, K extends Path<T>> = {
  name: K;
  register: UseFormRegister<T>;
};

const Anchor = <T extends FieldValues, K extends Path<T>>({
  name,
  register,
}: PropsType<T, K>) => {
  return (
    <input
      type="text"
      className="absolute top-0 right-0 opacity-0 max-h-0 max-w-0"
      {...register(`${name}_a` as unknown as Path<T>)}
    />
  );
};

export default Anchor;
