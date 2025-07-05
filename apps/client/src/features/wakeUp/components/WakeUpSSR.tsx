import type { FC } from "react";

type PropsType = {};

const WakeUpSSR: FC<PropsType> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <span className="txt__2xl text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rerum
        quaerat quae eligendi necessitatibus tempore sint explicabo consequuntur
        provident eos et beatae at, veniam delectus magni distinctio cumque
        accusamus ipsa.
      </span>

      <div className="w-[250px]"></div>
    </div>
  );
};

export default WakeUpSSR;
